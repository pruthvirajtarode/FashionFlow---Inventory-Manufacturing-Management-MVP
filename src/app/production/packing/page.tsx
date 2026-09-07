import { MockPageTemplate } from "@/components/ui/mock-page-template"

export default function Page() {
  return (
    <MockPageTemplate 
      title="Packing & Dispatch Prep"
      description="Group individual garments into cartons for inventory."
      primaryAction="Create Carton"
      columns={["Carton ID","SKU","Units Packed","Weight (kg)","Destination","Status"]}
      data={[
  [
    "BOX-00124",
    "TS-BLU-L",
    "50",
    "12.5",
    "Main Warehouse",
    "COMPLETED"
  ],
  [
    "BOX-00125",
    "TS-RED-S",
    "50",
    "12.0",
    "Main Warehouse",
    "COMPLETED"
  ],
  [
    "BOX-00126",
    "JK-BLK-XL",
    "20",
    "18.2",
    "Retail Store #1",
    "TRANSIT"
  ],
  [
    "BOX-00127",
    "PN-KHK-32",
    "35",
    "-",
    "Pending assignment",
    "IN PROGRESS"
  ]
]}
    />
  )
}
