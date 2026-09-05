"use server"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const fabricatorSchema = z.object({
  name: z.string().min(1),
  contactPerson: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  active: z.boolean().default(true),
  notes: z.string().optional()
})

export async function createFabricator(data: any) {
  const result = fabricatorSchema.safeParse(data)
  if (!result.success) return { success: false, error: "Invalid data" }
  try {
    const fab = await prisma.fabricator.create({ data: result.data })
    await prisma.auditLog.create({
      data: { eventType: 'CREATE_FABRICATOR', entityType: 'Fabricator', entityId: fab.id, newState: JSON.stringify(fab) }
    })
    revalidatePath('/master/fabricators')
    return { success: true, fabricator: fab }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

export async function getFabricators() {
  return await prisma.fabricator.findMany({ orderBy: { name: 'asc' } })
}

const productSchema = z.object({
  name: z.string().min(1),
  style: z.string().min(1),
  category: z.string().min(1),
})

export async function createProduct(data: any) {
  const result = productSchema.safeParse(data)
  if (!result.success) return { success: false, error: "Invalid data" }
  try {
    const prod = await prisma.product.create({ data: result.data })
    await prisma.auditLog.create({
      data: { eventType: 'CREATE_PRODUCT', entityType: 'Product', entityId: prod.id, newState: JSON.stringify(prod) }
    })
    revalidatePath('/master/products')
    return { success: true, product: prod }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

export async function getProducts() {
  return await prisma.product.findMany({ orderBy: { name: 'asc' } })
}
