import { MockPageTemplate } from "@/components/ui/mock-page-template"

export default function Page() {
  return (
    <MockPageTemplate 
      title="Challan Management"
      description="Track materials sent to and received from external fabricators."
      primaryAction="Issue Challan"
      columns={["Challan #","Fabricator","Issue Date","Items Sent","Expected Return","Status"]}
      data={[
  [
    "CH-2026-8801",
    "Apex Garments Ltd",
    "Oct 20, 2026",
    "500 pcs (Cut)",
    "Oct 30, 2026",
    "TRANSIT"
  ],
  [
    "CH-2026-8802",
    "StitchPerfect Inc",
    "Oct 15, 2026",
    "200 pcs (Cut)",
    "Oct 25, 2026",
    "COMPLETED"
  ],
  [
    "CH-2026-8803",
    "City Threads",
    "Oct 26, 2026",
    "1200 pcs (Cut)",
    "Nov 10, 2026",
    "TRANSIT"
  ],
  [
    "CH-2026-8804",
    "Apex Garments Ltd",
    "Sep 01, 2026",
    "150 pcs (Cut)",
    "Sep 15, 2026",
    "COMPLETED"
  ]
]}
    />
  )
}
