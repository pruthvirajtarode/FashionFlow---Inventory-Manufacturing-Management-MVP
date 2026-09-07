import { MockPageTemplate } from "@/components/ui/mock-page-template"

export default function Page() {
  return (
    <MockPageTemplate 
      title="Quality Control"
      description="Final stringent quality checks before packing."
      primaryAction="Log QC Report"
      columns={["Garment ID","SKU","Inspector","Check Date","Defect Type","Result"]}
      data={[
  [
    "GAR-100452",
    "TS-BLU-L",
    "Inspector #4",
    "Oct 26, 2026",
    "None",
    "PASSED"
  ],
  [
    "GAR-100456",
    "TS-BLU-L",
    "Inspector #4",
    "Oct 26, 2026",
    "Stitching Flaw",
    "FAILED"
  ],
  [
    "GAR-100457",
    "JK-BLK-XL",
    "Inspector #2",
    "Oct 26, 2026",
    "None",
    "PASSED"
  ],
  [
    "GAR-100458",
    "TS-RED-S",
    "Inspector #1",
    "-",
    "-",
    "PENDING"
  ]
]}
    />
  )
}
