import { MockPageTemplate } from "@/components/ui/mock-page-template"

export default function Page() {
  return (
    <MockPageTemplate 
      title="Finishing Operations"
      description="Track washing, ironing, and tagging processes."
      primaryAction="Update Status"
      columns={["Batch Ref","Process Type","Assigned To","Qty Input","Qty Output","Status"]}
      data={[
  [
    "CB-2024-08",
    "Washing & Ironing",
    "Line A",
    "495",
    "495",
    "COMPLETED"
  ],
  [
    "CB-2024-09",
    "Ironing & Tagging",
    "Line B",
    "148",
    "50",
    "IN PROGRESS"
  ],
  [
    "CB-2024-05",
    "Washing",
    "Line C",
    "200",
    "0",
    "PENDING"
  ]
]}
    />
  )
}
