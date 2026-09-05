import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
// import crypto from 'crypto'

export async function POST(req: Request) {
  try {
    const payloadString = await req.text()
    const signature = req.headers.get('x-shopify-hmac-sha256')
    
    // In production, verify signature:
    // const secret = process.env.SHOPIFY_WEBHOOK_SECRET!
    // const hash = crypto.createHmac('sha256', secret).update(payloadString).digest('base64')
    // if (hash !== signature) return new NextResponse('Unauthorized', { status: 401 })

    const data = JSON.parse(payloadString)
    const eventId = req.headers.get('x-shopify-webhook-id')
    const topic = req.headers.get('x-shopify-topic')

    if (!eventId) return new NextResponse('Missing webhook ID', { status: 400 })

    const existing = await prisma.shopifyWebhookEvent.findUnique({ where: { id: eventId } })
    if (existing) {
      return new NextResponse('Already processed', { status: 200 })
    }

    await prisma.$transaction(async (tx) => {
      await tx.shopifyWebhookEvent.create({
        data: { id: eventId, eventType: topic || 'unknown', payload: JSON.stringify(data), status: "PROCESSED" }
      })

      if (topic === 'orders/fulfilled') {
        const lineItems = data.line_items || []
        for (const item of lineItems) {
          const skuCode = item.sku
          if (!skuCode) continue

          const sku = await tx.sKU.findUnique({ where: { sku: skuCode } })
          if (!sku) continue

          const fulfilledQty = item.quantity

          const lastTx = await tx.garmentInventoryTransaction.findFirst({
            where: { skuId: sku.id },
            orderBy: { timestamp: 'desc' }
          })
          const beforeQty = lastTx ? lastTx.afterQty : 0
          const afterQty = beforeQty - fulfilledQty

          await tx.garmentInventoryTransaction.create({
            data: {
              skuId: sku.id,
              type: "SALE",
              qtyChange: -fulfilledQty,
              beforeQty, 
              afterQty,
              referenceId: data.id ? data.id.toString() : null,
              notes: "Shopify Fulfillment"
            }
          })
        }
      }
    })

    return new NextResponse('OK', { status: 200 })
  } catch (error) {
    console.error('Webhook error:', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
