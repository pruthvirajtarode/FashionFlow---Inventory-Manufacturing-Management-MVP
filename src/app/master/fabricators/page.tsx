import { MockPageTemplate } from "@/components/ui/mock-page-template"

export default function Page() {
  return (
    <MockPageTemplate 
      title="Fabricators & Vendors"
      description="Manage third-party stitching units and external vendors."
      primaryAction="Add Fabricator"
      columns={["Fabricator Name","Contact Person","Phone","Active Jobs","Rating","Status"]}
      data={[
  [
    "Apex Garments Ltd",
    "Rajiv Sharma",
    "+91 98765 43210",
    "BADGE:3 active challans",
    "4.8/5",
    "ACTIVE"
  ],
  [
    "StitchPerfect Inc",
    "Amit Patel",
    "+91 98765 11111",
    "BADGE:1 active challan",
    "4.5/5",
    "ACTIVE"
  ],
  [
    "Global Textiles",
    "Sarah Khan",
    "+91 98765 22222",
    "BADGE:0 active challans",
    "3.9/5",
    "ACTIVE"
  ],
  [
    "City Threads",
    "Vikram Singh",
    "+91 98765 33333",
    "BADGE:5 active challans",
    "4.9/5",
    "ACTIVE"
  ]
]}
    />
  )
}
