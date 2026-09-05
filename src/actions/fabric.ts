"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const fabricSchema = z.object({
  sku: z.string().min(1, "SKU is required"),
  name: z.string().min(1, "Name is required"),
  type: z.string().min(1, "Type is required"),
  material: z.string().min(1, "Material is required"),
  color: z.string().min(1, "Color is required"),
  gsm: z.coerce.number().optional(),
  width: z.coerce.number().optional(),
  uom: z.string().default("meters"),
  avgCost: z.coerce.number().optional(),
  supplier: z.string().optional(),
  minimumStock: z.coerce.number().default(0),
  targetDays: z.coerce.number().default(30),
  active: z.boolean().default(true),
  notes: z.string().optional()
})

export async function createFabric(data: any) {
  const result = fabricSchema.safeParse(data)
  if (!result.success) {
    return { success: false, error: result.error.errors[0].message }
  }

  try {
    const fabric = await prisma.fabric.create({ data: result.data })
    
    await prisma.auditLog.create({
      data: {
        eventType: 'CREATE_FABRIC',
        entityType: 'Fabric',
        entityId: fabric.id,
        newState: JSON.stringify(fabric)
      }
    })
    
    revalidatePath('/master/fabrics')
    return { success: true, fabric }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

export async function getFabrics() {
  return await prisma.fabric.findMany({ orderBy: { createdAt: 'desc' } })
}

export async function getFabricById(id: string) {
  return await prisma.fabric.findUnique({ where: { id } })
}
