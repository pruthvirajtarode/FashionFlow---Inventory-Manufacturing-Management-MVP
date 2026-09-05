"use server"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function moveGarmentStage(garmentBarcode: string, newStage: string, expectedCurrentStage: string, remarks?: string, userId?: string) {
  try {
    return await prisma.$transaction(async (tx) => {
      const garment = await tx.garment.findUnique({ where: { barcode: garmentBarcode }, include: { sku: true } })
      if (!garment) throw new Error("Garment not found")
      
      // Allow overriding QC_FAILED to REWORK, etc.
      if (expectedCurrentStage !== "*" && garment.status !== expectedCurrentStage) {
        throw new Error(`Invalid transition. Current stage is ${garment.status}`)
      }

      await tx.garment.update({
        where: { id: garment.id },
        data: { status: newStage }
      })

      await tx.garmentStatusHistory.create({
        data: {
          garmentId: garment.id,
          status: newStage,
          userId: userId,
          remarks: remarks
        }
      })

      if (newStage === "FINAL_INVENTORY") {
        // Compute running balance
        const lastTx = await tx.garmentInventoryTransaction.findFirst({
          where: { skuId: garment.skuId },
          orderBy: { timestamp: 'desc' }
        })
        const beforeQty = lastTx ? lastTx.afterQty : 0
        const afterQty = beforeQty + 1

        await tx.garmentInventoryTransaction.create({
          data: {
            skuId: garment.skuId,
            type: "GARMENT_CREATED",
            qtyChange: 1,
            beforeQty, 
            afterQty, 
            referenceId: garment.id
          }
        })
      }

      if (newStage === "RECEIVED") {
        const cItem = await tx.challanItem.findFirst({
          where: { garmentId: garment.id, status: "ISSUED" }
        })
        if (cItem) {
          await tx.challanItem.update({
            where: { id: cItem.id },
            data: { status: "RECEIVED", receivedAt: new Date() }
          })
          const challan = await tx.challan.findUnique({ where: { id: cItem.challanId }})
          if (challan) {
            const newQty = challan.receivedQty + 1
            await tx.challan.update({
              where: { id: challan.id },
              data: { 
                receivedQty: newQty,
                status: newQty >= challan.expectedQty ? "RECEIVED" : "PARTIALLY_RECEIVED" 
              }
            })
          }
        }
      }

      return { success: true, garment }
    })
  } catch (err: any) {
    return { success: false, error: err.message }
  } finally {
    revalidatePath('/production')
  }
}

export async function getBarcodeTrace(barcode: string) {
  const garment = await prisma.garment.findUnique({
    where: { barcode },
    include: {
      sku: { include: { product: true } },
      cuttingBatch: { include: { rolls: { include: { roll: { include: { fabric: true } } } } } },
      statusHistory: { orderBy: { timestamp: 'asc' }, include: { user: true } },
      challanItems: { include: { challan: { include: { fabricator: true } } } }
    }
  })
  
  if (garment) return { type: 'GARMENT', data: garment }

  const roll = await prisma.fabricRoll.findUnique({
    where: { barcode },
    include: {
      fabric: true,
      transactions: { orderBy: { timestamp: 'asc' } }
    }
  })
  
  if (roll) return { type: 'ROLL', data: roll }

  return null
}
