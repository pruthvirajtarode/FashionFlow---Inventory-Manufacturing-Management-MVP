import { MockPageTemplate } from "@/components/ui/mock-page-template"

export default function Page() {
  return (
    <MockPageTemplate 
      title="Garment Inventory"
      description="Real-time tracking of finished goods and their current statuses."
      primaryAction="Add Garment"
      columns={["Garment ID","SKU","Batch Ref","Current Location","Status","Last Scan Date"]}
      data={[
  [
    "GAR-100452",
    "TS-BLU-L",
    "CB-2024-08",
    "Warehouse A - Rack 3",
    "PASSED",
    "Oct 24, 2026"
  ],
  [
    "GAR-100453",
    "TS-BLU-M",
    "CB-2024-08",
    "QC Station 2",
    "IN PROGRESS",
    "Oct 25, 2026"
  ],
  [
    "GAR-100454",
    "TS-RED-S",
    "CB-2024-09",
    "Packing Area",
    "COMPLETED",
    "Oct 26, 2026"
  ],
  [
    "GAR-100455",
    "JK-BLK-XL",
    "CB-2024-05",
    "Warehouse B",
    "PASSED",
    "Oct 22, 2026"
  ],
  [
    "GAR-100456",
    "TS-BLU-L",
    "CB-2024-08",
    "QC Station 1",
    "FAILED",
    "Oct 25, 2026"
  ]
]}
    />
  )
}
