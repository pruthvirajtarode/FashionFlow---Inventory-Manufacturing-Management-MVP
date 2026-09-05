"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function createFabricRoll(data: { fabricId: string, originalQty: number, supplier?: string, batchLot?: string, cost?: number }) {
  try {
    const idCount = await prisma.fabricRoll.count()
    const rollId = `ROLL-${(idCount + 1).toString().padStart(4, '0')}`
    const barcode = `${rollId}-${Date.now().toString().slice(-4)}`
    
    const roll = await prisma.fabricRoll.create({
      data: {
        rollId,
        barcode,
        fabricId: data.fabricId,
        originalQty: data.originalQty,
        currentQty: data.originalQty,
        supplier: data.supplier,
        batchLot: data.batchLot,
        cost: data.cost,
        status: "AVAILABLE"
      }
    })

    await prisma.fabricInventoryTransaction.create({
      data: {
        rollId: roll.id,
        type: "RECEIPT",
        qtyChange: data.originalQty,
        beforeQty: 0,
        afterQty: data.originalQty
      }
    })

    revalidatePath('/inventory/fabric')
    return { success: true, roll }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

export async function getFabricRolls() {
  return await prisma.fabricRoll.findMany({ 
    include: { fabric: true },
    orderBy: { createdAt: 'desc' }
  })
}
