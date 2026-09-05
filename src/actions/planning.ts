"use server"
import { prisma } from "@/lib/prisma"

export async function calculateDOI() {
  const skus = await prisma.sKU.findMany({ include: { product: true } })
  const results = []

  for (const sku of skus) {
    // For MVP, mock sales velocity since we don't have historical sales data seeded
    // In production, this would query SalesOrder or ShopifyWebhookEvent history
    const wds = 5.2 // Mock weighted daily sales
    
    // Get current final inventory
    const lastTx = await prisma.garmentInventoryTransaction.findFirst({
      where: { skuId: sku.id },
      orderBy: { timestamp: 'desc' }
    })
    const currentStock = lastTx ? lastTx.afterQty : 0
    const wip = await prisma.garment.count({
      where: { skuId: sku.id, status: { notIn: ["FINAL_INVENTORY", "SOLD", "QC_FAILED", "DAMAGED", "LOST"] } }
    })

    const targetStock = Math.ceil(wds * sku.targetReadyStockDays)
    const projectedStock = currentStock + wip
    const recommendedProduction = Math.max(targetStock - projectedStock, 0)
    
    const doi = wds > 0 ? (currentStock / wds).toFixed(1) : "—"

    results.push({
      sku: sku.sku,
      product: sku.product.name,
      currentStock,
      wip,
      wds,
      doi,
      targetDays: sku.targetReadyStockDays,
      targetStock,
      recommendedProduction,
      priority: recommendedProduction > targetStock * 0.5 ? "CRITICAL" : recommendedProduction > 0 ? "HIGH" : "NORMAL"
    })
  }

  return results
}
