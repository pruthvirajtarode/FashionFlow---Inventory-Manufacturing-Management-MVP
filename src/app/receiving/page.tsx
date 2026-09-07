import { MockPageTemplate } from "@/components/ui/mock-page-template"

export default function Page() {
  return (
    <MockPageTemplate 
      title="Receiving (Inward)"
      description="Log inward shipments of stitched garments from fabricators."
      primaryAction="New Receipt"
      columns={["Receipt ID","Ref Challan","Fabricator","Received Qty","Shortage/Excess","Status"]}
      data={[
  [
    "RCV-9901",
    "CH-2026-8802",
    "StitchPerfect Inc",
    "198 pcs",
    "BADGE:-2 pcs",
    "COMPLETED"
  ],
  [
    "RCV-9902",
    "CH-2026-8804",
    "Apex Garments Ltd",
    "150 pcs",
    "BADGE:0 pcs",
    "COMPLETED"
  ],
  [
    "RCV-9903",
    "CH-2026-8790",
    "Global Textiles",
    "405 pcs",
    "BADGE:+5 pcs",
    "COMPLETED"
  ]
]}
    />
  )
}
