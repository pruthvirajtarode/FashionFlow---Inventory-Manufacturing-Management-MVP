import { MockPageTemplate } from "@/components/ui/mock-page-template"

export default function Page() {
  return (
    <MockPageTemplate 
      title="User Management"
      description="Manage employee access and credentials."
      primaryAction="Add User"
      columns={["Name","Email","Role","Department","Last Login","Status"]}
      data={[
  [
    "Pruthviraj Tarode",
    "admin@fashionflow.com",
    "Super Admin",
    "Management",
    "Just now",
    "ACTIVE"
  ],
  [
    "Amit Sharma",
    "amit@fashionflow.com",
    "Production Manager",
    "Production",
    "2 hours ago",
    "ACTIVE"
  ],
  [
    "Sarah Connor",
    "sarah@fashionflow.com",
    "QC Inspector",
    "Quality",
    "1 day ago",
    "ACTIVE"
  ],
  [
    "John Doe",
    "john@fashionflow.com",
    "Warehouse Staff",
    "Inventory",
    "5 days ago",
    "FAILED"
  ]
]}
    />
  )
}
