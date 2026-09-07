"use server"
import { prisma } from "@/lib/prisma"

export async function calculateDOI() {
  const skus = await prisma.sKU.findMany({ include: { product: true } })
  const results = []

  for (const sku of skus) {
    // 50/30/20 Weighted Average Logic for Daily Sales (WDS)
    // For MVP, since we lack historical Shopify data, we simulate deterministic past sales based on SKU
    const seed = sku.id.charCodeAt(0) + sku.id.charCodeAt(sku.id.length - 1)
    
    // Simulate average sales per day over last 7, 15, and 30 days
    const avg7 = (seed % 10) + 2
    const avg15 = (seed % 8) + 1.5
    const avg30 = (seed % 6) + 1
    
    // Weighted Average Daily Sales
    const wds = Number(((avg7 * 0.5) + (avg15 * 0.3) + (avg30 * 0.2)).toFixed(1))
    
    // Get current final inventory
    const lastTx = await prisma.garmentInventoryTransaction.findFirst({
      where: { skuId: sku.id },
      orderBy: { timestamp: 'desc' }
    })
    const currentStock = lastTx ? lastTx.afterQty : (seed % 50) + 10 // Mock baseline if empty
    
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

  return results.sort((a, b) => (a.priority === "CRITICAL" ? -1 : 1))
}

export async function calculateFabricDOI() {
  const fabrics = await prisma.fabric.findMany({ include: { skus: true } })
  const garmentPlanning = await calculateDOI()
  const results = []

  for (const fabric of fabrics) {
    // Calculate total daily fabric demand across all SKUs using this fabric
    let dailyFabricDemand = 0
    let totalRecommendedFabricProduction = 0
    
    for (const sku of fabric.skus) {
      const plan = garmentPlanning.find(p => p.sku === sku.sku)
      if (plan) {
        dailyFabricDemand += plan.wds * sku.avgFabricConsumption
        totalRecommendedFabricProduction += plan.recommendedProduction * sku.avgFabricConsumption
      }
    }

    // Get current fabric stock
    const rolls = await prisma.fabricRoll.findMany({ where: { fabricId: fabric.id, status: "AVAILABLE" } })
    const currentStock = rolls.reduce((acc, roll) => acc + roll.currentQty, 0) || (fabric.id.charCodeAt(0) * 10) // Mock baseline

    const targetStock = Math.ceil(dailyFabricDemand * fabric.targetDays)
    
    // Alert if we don't have enough to meet the recommended garment production OR target 30 days
    const shortage = Math.max(targetStock - currentStock, 0)
    
    const doi = dailyFabricDemand > 0 ? (currentStock / dailyFabricDemand).toFixed(1) : "—"

    results.push({
      fabricSku: fabric.sku,
      name: fabric.name,
      material: fabric.material,
      currentStock: currentStock.toFixed(1),
      dailyDemand: dailyFabricDemand.toFixed(1),
      doi,
      targetDays: fabric.targetDays,
      targetStock: targetStock.toFixed(1),
      recommendedOrder: shortage.toFixed(1),
      uom: fabric.uom,
      priority: shortage > targetStock * 0.5 ? "CRITICAL" : shortage > 0 ? "HIGH" : "NORMAL"
    })
  }

  return results.sort((a, b) => (a.priority === "CRITICAL" ? -1 : 1))
}
