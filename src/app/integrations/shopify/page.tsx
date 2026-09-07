import { MockPageTemplate } from "@/components/ui/mock-page-template"

export default function Page() {
  return (
    <MockPageTemplate 
      title="Shopify Integration"
      description="Sync inventory levels and pull online orders automatically."
      primaryAction="Force Sync Now"
      columns={["Sync ID","Event Type","Items Affected","Triggered By","Sync Time","Status"]}
      data={[
  [
    "SYNC-8821",
    "Inventory Update",
    "45 SKUs",
    "Automated (Hourly)",
    "10 mins ago",
    "COMPLETED"
  ],
  [
    "SYNC-8820",
    "Order Import",
    "12 Orders",
    "Webhook",
    "45 mins ago",
    "COMPLETED"
  ],
  [
    "SYNC-8819",
    "Product Catalog",
    "1 SKU",
    "Manual (Admin)",
    "2 hours ago",
    "FAILED"
  ],
  [
    "SYNC-8818",
    "Inventory Update",
    "45 SKUs",
    "Automated (Hourly)",
    "3 hours ago",
    "COMPLETED"
  ]
]}
    />
  )
}
