import { MockPageTemplate } from "@/components/ui/mock-page-template"

export default function Page() {
  return (
    <MockPageTemplate 
      title="Role Permissions"
      description="Configure granular RBAC permissions across modules."
      primaryAction="Create Role"
      columns={["Role Name","Description","Users Assigned","Access Level","Permissions","Status"]}
      data={[
  [
    "Super Admin",
    "Full system access",
    "1",
    "Global",
    "BADGE:All",
    "ACTIVE"
  ],
  [
    "Production Manager",
    "Manage cutting, routing",
    "3",
    "Department",
    "BADGE:24 Policies",
    "ACTIVE"
  ],
  [
    "QC Inspector",
    "Only QC approvals",
    "5",
    "Module",
    "BADGE:5 Policies",
    "ACTIVE"
  ],
  [
    "Warehouse Staff",
    "Inventory inward/outward",
    "8",
    "Module",
    "BADGE:8 Policies",
    "ACTIVE"
  ]
]}
    />
  )
}
