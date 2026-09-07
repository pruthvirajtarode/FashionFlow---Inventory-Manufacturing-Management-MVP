import { MockPageTemplate } from "@/components/ui/mock-page-template"

export default function Page() {
  return (
    <MockPageTemplate 
      title="Production Planning"
      description="Forecast demand and schedule cutting batches."
      primaryAction="New Forecast"
      columns={["Plan ID","Target SKU","Required By","Planned Qty","Assigned Fabric","Status"]}
      data={[
  [
    "PLAN-Q4-01",
    "TS-BLU-L",
    "Nov 15, 2026",
    "2000",
    "ROLL-0042",
    "ACTIVE"
  ],
  [
    "PLAN-Q4-02",
    "JK-BLK-XL",
    "Dec 01, 2026",
    "500",
    "Pending Allocation",
    "PENDING"
  ],
  [
    "PLAN-Q3-99",
    "TS-RED-S",
    "Oct 01, 2026",
    "1500",
    "ROLL-0021",
    "COMPLETED"
  ]
]}
    />
  )
}
