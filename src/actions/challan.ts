"use server"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function createChallan(data: { fabricatorId: string, cuttingBatchId: string, expectedQty: number, garmentIds: string[] }) {
  try {
    return await prisma.$transaction(async (tx) => {
      const challanCount = await tx.challan.count()
      const challanNumber = `CH-${(challanCount + 1).toString().padStart(4, '0')}`

      const challan = await tx.challan.create({
        data: {
          challanNumber,
          fabricatorId: data.fabricatorId,
          cuttingBatchId: data.cuttingBatchId,
          expectedQty: data.expectedQty,
          status: "ISSUED"
        }
      })

      const challanItems = data.garmentIds.map(gId => ({
        challanId: challan.id,
        garmentId: gId,
        status: "ISSUED"
      }))

      await tx.challanItem.createMany({ data: challanItems })

      await tx.garment.updateMany({
        where: { id: { in: data.garmentIds } },
        data: { status: "WITH_FABRICATOR" }
      })

      const historyLogs = data.garmentIds.map(gId => ({
        garmentId: gId,
        status: "WITH_FABRICATOR",
        remarks: `Issued to challan ${challanNumber}`
      }))
      await tx.garmentStatusHistory.createMany({ data: historyLogs })

      return { success: true, challan }
    })
  } catch (err: any) {
    return { success: false, error: err.message }
  } finally {
    revalidatePath('/challans')
  }
}
