import { MockPageTemplate } from "@/components/ui/mock-page-template"

export default function Page() {
  return (
    <MockPageTemplate 
      title="Cutting Batches"
      description="Track fabric cutting orders and yield efficiency."
      primaryAction="New Cutting Batch"
      columns={["Batch ID","Target SKU","Fabric Roll Ref","Expected Yield","Actual Yield","Status"]}
      data={[
  [
    "CB-2026-142",
    "TS-BLU-L",
    "ROLL-0042",
    "120 units",
    "118 units",
    "COMPLETED"
  ],
  [
    "CB-2026-143",
    "TS-RED-S",
    "ROLL-0055",
    "80 units",
    "-",
    "IN PROGRESS"
  ],
  [
    "CB-2026-144",
    "JK-BLK-XL",
    "ROLL-0012",
    "45 units",
    "-",
    "PENDING"
  ],
  [
    "CB-2026-145",
    "PN-KHK-32",
    "ROLL-0089",
    "200 units",
    "195 units",
    "COMPLETED"
  ]
]}
    />
  )
}
