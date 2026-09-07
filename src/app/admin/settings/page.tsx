import { MockPageTemplate } from "@/components/ui/mock-page-template"

export default function Page() {
  return (
    <MockPageTemplate 
      title="System Settings"
      description="Global application configurations and defaults."
      primaryAction="Save Changes"
      columns={["Setting Key","Category","Current Value","Last Modified","Modified By","Status"]}
      data={[
  [
    "DEFAULT_UOM_FABRIC",
    "Inventory",
    "meters",
    "Sep 01, 2026",
    "System",
    "ACTIVE"
  ],
  [
    "QC_STRICT_MODE",
    "Production",
    "true",
    "Oct 15, 2026",
    "Pruthviraj",
    "ACTIVE"
  ],
  [
    "BARCODE_PREFIX",
    "System",
    "FF-",
    "Sep 01, 2026",
    "System",
    "ACTIVE"
  ],
  [
    "SHOPIFY_AUTO_SYNC",
    "Integrations",
    "true",
    "Oct 20, 2026",
    "Pruthviraj",
    "ACTIVE"
  ]
]}
    />
  )
}
