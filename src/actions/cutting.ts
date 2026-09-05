"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function createCuttingBatch(data: { skuId: string, rollId: string, issueQty: number, expectedQty: number, cutter?: string }) {
  try {
    return await prisma.$transaction(async (tx) => {
      const roll = await tx.fabricRoll.findUnique({ where: { id: data.rollId } })
      if (!roll || roll.currentQty < data.issueQty) {
        throw new Error("Insufficient fabric quantity in roll")
      }

      const batchCount = await tx.cuttingBatch.count()
      const batchId = `CUT-${(batchCount + 1).toString().padStart(4, '0')}`

      const batch = await tx.cuttingBatch.create({
        data: {
          batchId,
          skuId: data.skuId,
          expectedQty: data.expectedQty,
          cutter: data.cutter,
          status: "PLANNED"
        }
      })

      await tx.cuttingBatchRoll.create({
        data: { cuttingBatchId: batch.id, rollId: roll.id, qtyIssued: data.issueQty }
      })

      const newRollQty = roll.currentQty - data.issueQty
      await tx.fabricRoll.update({
        where: { id: roll.id },
        data: { 
          currentQty: newRollQty,
          status: newRollQty <= 0 ? "CONSUMED" : "PARTIALLY_ISSUED"
        }
      })

      await tx.fabricInventoryTransaction.create({
        data: {
          rollId: roll.id,
          type: "ISSUE",
          qtyChange: -data.issueQty,
          beforeQty: roll.currentQty,
          afterQty: newRollQty,
          referenceId: batch.id
        }
      })

      return { success: true, batch }
    })
  } catch (err: any) {
    return { success: false, error: err.message }
  } finally {
    revalidatePath('/cutting')
    revalidatePath('/inventory/fabric')
  }
}

export async function confirmCuttingBatch(batchId: string, actualQty: number) {
  try {
    return await prisma.$transaction(async (tx) => {
      const batch = await tx.cuttingBatch.findUnique({ where: { id: batchId }, include: { sku: true } })
      if (!batch || batch.status !== "PLANNED") throw new Error("Invalid batch or already completed")

      await tx.cuttingBatch.update({
        where: { id: batchId },
        data: { status: "COMPLETED", actualQty }
      })

      const garmentCount = await tx.garment.count()
      const newGarments = []

      for (let i = 0; i < actualQty; i++) {
        const gId = `GAR-${(garmentCount + i + 1).toString().padStart(6, '0')}`
        newGarments.push({
          garmentId: gId,
          barcode: gId,
          skuId: batch.skuId,
          cuttingBatchId: batch.id,
          status: "CUT"
        })
      }

      await tx.garment.createMany({ data: newGarments })

      const createdGarments = await tx.garment.findMany({ where: { cuttingBatchId: batch.id } })

      const historyLogs = createdGarments.map(g => ({
        garmentId: g.id,
        status: "CUT",
        remarks: "Generated from cutting batch"
      }))

      await tx.garmentStatusHistory.createMany({ data: historyLogs })

      return { success: true, generatedIds: createdGarments.map(g => g.garmentId) }
    })
  } catch (err: any) {
    return { success: false, error: err.message }
  } finally {
    revalidatePath('/cutting')
  }
}
