import { MockPageTemplate } from "@/components/ui/mock-page-template"

export default function Page() {
  return (
    <MockPageTemplate 
      title="SKU Master"
      description="Manage product variants, BOM mapping, and standard sizing."
      primaryAction="Create SKU"
      columns={["SKU Code","Product Name","Category","Color/Size","Target Stock","Status"]}
      data={[
  [
    "TS-BLU-L",
    "Classic Crewneck Tee",
    "T-Shirts",
    "BADGE:Navy Blue / L",
    "500 units",
    "ACTIVE"
  ],
  [
    "TS-BLU-M",
    "Classic Crewneck Tee",
    "T-Shirts",
    "BADGE:Navy Blue / M",
    "750 units",
    "ACTIVE"
  ],
  [
    "TS-RED-S",
    "Classic Crewneck Tee",
    "T-Shirts",
    "BADGE:Crimson / S",
    "300 units",
    "ACTIVE"
  ],
  [
    "JK-BLK-XL",
    "Winter Bomber Jacket",
    "Jackets",
    "BADGE:Obsidian / XL",
    "150 units",
    "ACTIVE"
  ],
  [
    "PN-KHK-32",
    "Chino Trousers",
    "Pants",
    "BADGE:Khaki / 32",
    "400 units",
    "ACTIVE"
  ]
]}
    />
  )
}
