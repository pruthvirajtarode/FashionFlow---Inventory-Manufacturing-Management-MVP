import { MockPageTemplate } from "@/components/ui/mock-page-template"

export default function Page() {
  return (
    <MockPageTemplate 
      title="Checking & Inspection"
      description="Initial inspection of garments received from stitching."
      primaryAction="Scan Batch"
      columns={["Batch Ref","SKU","Total Received","Checked Qty","Passed","Status"]}
      data={[
  [
    "CB-2024-08",
    "TS-BLU-L",
    "500",
    "500",
    "495",
    "COMPLETED"
  ],
  [
    "CB-2024-09",
    "TS-RED-S",
    "300",
    "150",
    "148",
    "IN PROGRESS"
  ],
  [
    "CB-2024-10",
    "JK-BLK-XL",
    "150",
    "0",
    "0",
    "PENDING"
  ]
]}
    />
  )
}
