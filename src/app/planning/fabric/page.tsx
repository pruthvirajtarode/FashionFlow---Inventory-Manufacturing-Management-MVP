import { MockPageTemplate } from "@/components/ui/mock-page-template"

export default function Page() {
  return (
    <MockPageTemplate 
      title="Fabric Requirement Planning"
      description="Calculate fabric needs based on production forecasts."
      primaryAction="Generate PO"
      columns={["Material / Color","Required For","Total Needed","Current Stock","Shortage","Status"]}
      data={[
  [
    "100% Cotton / Indigo Blue",
    "PLAN-Q4-01",
    "2500 m",
    "1000 m",
    "BADGE:1500 m",
    "PENDING"
  ],
  [
    "Fleece / Obsidian",
    "PLAN-Q4-02",
    "800 m",
    "1200 m",
    "BADGE:0 m",
    "PASSED"
  ],
  [
    "Linen / White",
    "PLAN-Q1-05",
    "5000 m",
    "500 m",
    "BADGE:4500 m",
    "PENDING"
  ]
]}
    />
  )
}
