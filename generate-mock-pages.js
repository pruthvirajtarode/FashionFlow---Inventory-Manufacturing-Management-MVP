const fs = require('fs');
const path = require('path');

const mockTemplatePath = path.join(__dirname, 'src', 'components', 'ui', 'mock-page-template.tsx');

const mockTemplateContent = `"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Filter, Download } from "lucide-react"

export function MockPageTemplate({ 
  title, 
  description, 
  columns, 
  data,
  primaryAction = "Create New"
}: { 
  title: string, 
  description: string, 
  columns: string[], 
  data: any[][],
  primaryAction?: string
}) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
          <p className="text-muted-foreground">{description}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Download className="mr-2 h-4 w-4" /> Export</Button>
          <Button><Plus className="mr-2 h-4 w-4" /> {primaryAction}</Button>
        </div>
      </div>

      <div className="bg-white rounded-lg border shadow-sm">
        <div className="p-4 border-b flex items-center justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search records..." className="pl-8" />
          </div>
          <Button variant="outline" size="sm" className="hidden sm:flex">
            <Filter className="mr-2 h-4 w-4" /> Filter
          </Button>
        </div>
        <div className="relative w-full overflow-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50 hover:bg-slate-50">
                {columns.map((col, i) => (
                  <TableHead key={i}>{col}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row, i) => (
                <TableRow key={i} className="hover:bg-slate-50/50 cursor-pointer transition-colors">
                  {row.map((cell, j) => (
                    <TableCell key={j}>
                      {typeof cell === 'string' && (cell === 'ACTIVE' || cell === 'PASSED' || cell === 'COMPLETED' || cell === 'DELIVERED') ? (
                        <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">{cell}</Badge>
                      ) : typeof cell === 'string' && (cell === 'IN PROGRESS' || cell === 'PENDING' || cell === 'TRANSIT') ? (
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-100">{cell}</Badge>
                      ) : typeof cell === 'string' && (cell === 'FAILED' || cell === 'REJECTED') ? (
                        <Badge variant="destructive">{cell}</Badge>
                      ) : typeof cell === 'string' && cell.startsWith('BADGE:') ? (
                        <Badge variant="outline">{cell.replace('BADGE:', '')}</Badge>
                      ) : (
                        cell
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="p-4 border-t text-sm text-muted-foreground flex justify-between items-center">
          <span>Showing 1 to {data.length} of {data.length + 42} records</span>
          <div className="flex gap-1">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
`;

fs.writeFileSync(mockTemplatePath, mockTemplateContent);
console.log("Created MockPageTemplate");

const pages = [
  {
    path: 'src/app/inventory/garments/page.tsx',
    title: 'Garment Inventory',
    desc: 'Real-time tracking of finished goods and their current statuses.',
    action: 'Add Garment',
    cols: ['Garment ID', 'SKU', 'Batch Ref', 'Current Location', 'Status', 'Last Scan Date'],
    data: [
      ['GAR-100452', 'TS-BLU-L', 'CB-2024-08', 'Warehouse A - Rack 3', 'PASSED', 'Oct 24, 2026'],
      ['GAR-100453', 'TS-BLU-M', 'CB-2024-08', 'QC Station 2', 'IN PROGRESS', 'Oct 25, 2026'],
      ['GAR-100454', 'TS-RED-S', 'CB-2024-09', 'Packing Area', 'COMPLETED', 'Oct 26, 2026'],
      ['GAR-100455', 'JK-BLK-XL', 'CB-2024-05', 'Warehouse B', 'PASSED', 'Oct 22, 2026'],
      ['GAR-100456', 'TS-BLU-L', 'CB-2024-08', 'QC Station 1', 'FAILED', 'Oct 25, 2026']
    ]
  },
  {
    path: 'src/app/inventory/sku/page.tsx',
    title: 'SKU Master',
    desc: 'Manage product variants, BOM mapping, and standard sizing.',
    action: 'Create SKU',
    cols: ['SKU Code', 'Product Name', 'Category', 'Color/Size', 'Target Stock', 'Status'],
    data: [
      ['TS-BLU-L', 'Classic Crewneck Tee', 'T-Shirts', 'BADGE:Navy Blue / L', '500 units', 'ACTIVE'],
      ['TS-BLU-M', 'Classic Crewneck Tee', 'T-Shirts', 'BADGE:Navy Blue / M', '750 units', 'ACTIVE'],
      ['TS-RED-S', 'Classic Crewneck Tee', 'T-Shirts', 'BADGE:Crimson / S', '300 units', 'ACTIVE'],
      ['JK-BLK-XL', 'Winter Bomber Jacket', 'Jackets', 'BADGE:Obsidian / XL', '150 units', 'ACTIVE'],
      ['PN-KHK-32', 'Chino Trousers', 'Pants', 'BADGE:Khaki / 32', '400 units', 'ACTIVE']
    ]
  },
  {
    path: 'src/app/cutting/page.tsx',
    title: 'Cutting Batches',
    desc: 'Track fabric cutting orders and yield efficiency.',
    action: 'New Cutting Batch',
    cols: ['Batch ID', 'Target SKU', 'Fabric Roll Ref', 'Expected Yield', 'Actual Yield', 'Status'],
    data: [
      ['CB-2026-142', 'TS-BLU-L', 'ROLL-0042', '120 units', '118 units', 'COMPLETED'],
      ['CB-2026-143', 'TS-RED-S', 'ROLL-0055', '80 units', '-', 'IN PROGRESS'],
      ['CB-2026-144', 'JK-BLK-XL', 'ROLL-0012', '45 units', '-', 'PENDING'],
      ['CB-2026-145', 'PN-KHK-32', 'ROLL-0089', '200 units', '195 units', 'COMPLETED']
    ]
  },
  {
    path: 'src/app/master/fabricators/page.tsx',
    title: 'Fabricators & Vendors',
    desc: 'Manage third-party stitching units and external vendors.',
    action: 'Add Fabricator',
    cols: ['Fabricator Name', 'Contact Person', 'Phone', 'Active Jobs', 'Rating', 'Status'],
    data: [
      ['Apex Garments Ltd', 'Rajiv Sharma', '+91 98765 43210', 'BADGE:3 active challans', '4.8/5', 'ACTIVE'],
      ['StitchPerfect Inc', 'Amit Patel', '+91 98765 11111', 'BADGE:1 active challan', '4.5/5', 'ACTIVE'],
      ['Global Textiles', 'Sarah Khan', '+91 98765 22222', 'BADGE:0 active challans', '3.9/5', 'ACTIVE'],
      ['City Threads', 'Vikram Singh', '+91 98765 33333', 'BADGE:5 active challans', '4.9/5', 'ACTIVE']
    ]
  },
  {
    path: 'src/app/challans/page.tsx',
    title: 'Challan Management',
    desc: 'Track materials sent to and received from external fabricators.',
    action: 'Issue Challan',
    cols: ['Challan #', 'Fabricator', 'Issue Date', 'Items Sent', 'Expected Return', 'Status'],
    data: [
      ['CH-2026-8801', 'Apex Garments Ltd', 'Oct 20, 2026', '500 pcs (Cut)', 'Oct 30, 2026', 'TRANSIT'],
      ['CH-2026-8802', 'StitchPerfect Inc', 'Oct 15, 2026', '200 pcs (Cut)', 'Oct 25, 2026', 'COMPLETED'],
      ['CH-2026-8803', 'City Threads', 'Oct 26, 2026', '1200 pcs (Cut)', 'Nov 10, 2026', 'TRANSIT'],
      ['CH-2026-8804', 'Apex Garments Ltd', 'Sep 01, 2026', '150 pcs (Cut)', 'Sep 15, 2026', 'COMPLETED']
    ]
  },
  {
    path: 'src/app/receiving/page.tsx',
    title: 'Receiving (Inward)',
    desc: 'Log inward shipments of stitched garments from fabricators.',
    action: 'New Receipt',
    cols: ['Receipt ID', 'Ref Challan', 'Fabricator', 'Received Qty', 'Shortage/Excess', 'Status'],
    data: [
      ['RCV-9901', 'CH-2026-8802', 'StitchPerfect Inc', '198 pcs', 'BADGE:-2 pcs', 'COMPLETED'],
      ['RCV-9902', 'CH-2026-8804', 'Apex Garments Ltd', '150 pcs', 'BADGE:0 pcs', 'COMPLETED'],
      ['RCV-9903', 'CH-2026-8790', 'Global Textiles', '405 pcs', 'BADGE:+5 pcs', 'COMPLETED']
    ]
  },
  {
    path: 'src/app/production/checking/page.tsx',
    title: 'Checking & Inspection',
    desc: 'Initial inspection of garments received from stitching.',
    action: 'Scan Batch',
    cols: ['Batch Ref', 'SKU', 'Total Received', 'Checked Qty', 'Passed', 'Status'],
    data: [
      ['CB-2024-08', 'TS-BLU-L', '500', '500', '495', 'COMPLETED'],
      ['CB-2024-09', 'TS-RED-S', '300', '150', '148', 'IN PROGRESS'],
      ['CB-2024-10', 'JK-BLK-XL', '150', '0', '0', 'PENDING']
    ]
  },
  {
    path: 'src/app/production/finishing/page.tsx',
    title: 'Finishing Operations',
    desc: 'Track washing, ironing, and tagging processes.',
    action: 'Update Status',
    cols: ['Batch Ref', 'Process Type', 'Assigned To', 'Qty Input', 'Qty Output', 'Status'],
    data: [
      ['CB-2024-08', 'Washing & Ironing', 'Line A', '495', '495', 'COMPLETED'],
      ['CB-2024-09', 'Ironing & Tagging', 'Line B', '148', '50', 'IN PROGRESS'],
      ['CB-2024-05', 'Washing', 'Line C', '200', '0', 'PENDING']
    ]
  },
  {
    path: 'src/app/production/qc/page.tsx',
    title: 'Quality Control',
    desc: 'Final stringent quality checks before packing.',
    action: 'Log QC Report',
    cols: ['Garment ID', 'SKU', 'Inspector', 'Check Date', 'Defect Type', 'Result'],
    data: [
      ['GAR-100452', 'TS-BLU-L', 'Inspector #4', 'Oct 26, 2026', 'None', 'PASSED'],
      ['GAR-100456', 'TS-BLU-L', 'Inspector #4', 'Oct 26, 2026', 'Stitching Flaw', 'FAILED'],
      ['GAR-100457', 'JK-BLK-XL', 'Inspector #2', 'Oct 26, 2026', 'None', 'PASSED'],
      ['GAR-100458', 'TS-RED-S', 'Inspector #1', '-', '-', 'PENDING']
    ]
  },
  {
    path: 'src/app/production/packing/page.tsx',
    title: 'Packing & Dispatch Prep',
    desc: 'Group individual garments into cartons for inventory.',
    action: 'Create Carton',
    cols: ['Carton ID', 'SKU', 'Units Packed', 'Weight (kg)', 'Destination', 'Status'],
    data: [
      ['BOX-00124', 'TS-BLU-L', '50', '12.5', 'Main Warehouse', 'COMPLETED'],
      ['BOX-00125', 'TS-RED-S', '50', '12.0', 'Main Warehouse', 'COMPLETED'],
      ['BOX-00126', 'JK-BLK-XL', '20', '18.2', 'Retail Store #1', 'TRANSIT'],
      ['BOX-00127', 'PN-KHK-32', '35', '-', 'Pending assignment', 'IN PROGRESS']
    ]
  },
  {
    path: 'src/app/planning/production/page.tsx',
    title: 'Production Planning',
    desc: 'Forecast demand and schedule cutting batches.',
    action: 'New Forecast',
    cols: ['Plan ID', 'Target SKU', 'Required By', 'Planned Qty', 'Assigned Fabric', 'Status'],
    data: [
      ['PLAN-Q4-01', 'TS-BLU-L', 'Nov 15, 2026', '2000', 'ROLL-0042', 'ACTIVE'],
      ['PLAN-Q4-02', 'JK-BLK-XL', 'Dec 01, 2026', '500', 'Pending Allocation', 'PENDING'],
      ['PLAN-Q3-99', 'TS-RED-S', 'Oct 01, 2026', '1500', 'ROLL-0021', 'COMPLETED']
    ]
  },
  {
    path: 'src/app/planning/fabric/page.tsx',
    title: 'Fabric Requirement Planning',
    desc: 'Calculate fabric needs based on production forecasts.',
    action: 'Generate PO',
    cols: ['Material / Color', 'Required For', 'Total Needed', 'Current Stock', 'Shortage', 'Status'],
    data: [
      ['100% Cotton / Indigo Blue', 'PLAN-Q4-01', '2500 m', '1000 m', 'BADGE:1500 m', 'PENDING'],
      ['Fleece / Obsidian', 'PLAN-Q4-02', '800 m', '1200 m', 'BADGE:0 m', 'PASSED'],
      ['Linen / White', 'PLAN-Q1-05', '5000 m', '500 m', 'BADGE:4500 m', 'PENDING']
    ]
  },
  {
    path: 'src/app/integrations/shopify/page.tsx',
    title: 'Shopify Integration',
    desc: 'Sync inventory levels and pull online orders automatically.',
    action: 'Force Sync Now',
    cols: ['Sync ID', 'Event Type', 'Items Affected', 'Triggered By', 'Sync Time', 'Status'],
    data: [
      ['SYNC-8821', 'Inventory Update', '45 SKUs', 'Automated (Hourly)', '10 mins ago', 'COMPLETED'],
      ['SYNC-8820', 'Order Import', '12 Orders', 'Webhook', '45 mins ago', 'COMPLETED'],
      ['SYNC-8819', 'Product Catalog', '1 SKU', 'Manual (Admin)', '2 hours ago', 'FAILED'],
      ['SYNC-8818', 'Inventory Update', '45 SKUs', 'Automated (Hourly)', '3 hours ago', 'COMPLETED']
    ]
  },
  {
    path: 'src/app/admin/users/page.tsx',
    title: 'User Management',
    desc: 'Manage employee access and credentials.',
    action: 'Add User',
    cols: ['Name', 'Email', 'Role', 'Department', 'Last Login', 'Status'],
    data: [
      ['Pruthviraj Tarode', 'admin@fashionflow.com', 'Super Admin', 'Management', 'Just now', 'ACTIVE'],
      ['Amit Sharma', 'amit@fashionflow.com', 'Production Manager', 'Production', '2 hours ago', 'ACTIVE'],
      ['Sarah Connor', 'sarah@fashionflow.com', 'QC Inspector', 'Quality', '1 day ago', 'ACTIVE'],
      ['John Doe', 'john@fashionflow.com', 'Warehouse Staff', 'Inventory', '5 days ago', 'FAILED']
    ]
  },
  {
    path: 'src/app/admin/roles/page.tsx',
    title: 'Role Permissions',
    desc: 'Configure granular RBAC permissions across modules.',
    action: 'Create Role',
    cols: ['Role Name', 'Description', 'Users Assigned', 'Access Level', 'Permissions', 'Status'],
    data: [
      ['Super Admin', 'Full system access', '1', 'Global', 'BADGE:All', 'ACTIVE'],
      ['Production Manager', 'Manage cutting, routing', '3', 'Department', 'BADGE:24 Policies', 'ACTIVE'],
      ['QC Inspector', 'Only QC approvals', '5', 'Module', 'BADGE:5 Policies', 'ACTIVE'],
      ['Warehouse Staff', 'Inventory inward/outward', '8', 'Module', 'BADGE:8 Policies', 'ACTIVE']
    ]
  },
  {
    path: 'src/app/admin/settings/page.tsx',
    title: 'System Settings',
    desc: 'Global application configurations and defaults.',
    action: 'Save Changes',
    cols: ['Setting Key', 'Category', 'Current Value', 'Last Modified', 'Modified By', 'Status'],
    data: [
      ['DEFAULT_UOM_FABRIC', 'Inventory', 'meters', 'Sep 01, 2026', 'System', 'ACTIVE'],
      ['QC_STRICT_MODE', 'Production', 'true', 'Oct 15, 2026', 'Pruthviraj', 'ACTIVE'],
      ['BARCODE_PREFIX', 'System', 'FF-', 'Sep 01, 2026', 'System', 'ACTIVE'],
      ['SHOPIFY_AUTO_SYNC', 'Integrations', 'true', 'Oct 20, 2026', 'Pruthviraj', 'ACTIVE']
    ]
  }
];

pages.forEach(p => {
  const fullPath = path.join(__dirname, p.path);
  const content = `import { MockPageTemplate } from "@/components/ui/mock-page-template"

export default function Page() {
  return (
    <MockPageTemplate 
      title="${p.title}"
      description="${p.desc}"
      primaryAction="${p.action}"
      columns={${JSON.stringify(p.cols)}}
      data={${JSON.stringify(p.data, null, 2)}}
    />
  )
}
`;
  fs.writeFileSync(fullPath, content);
  console.log('Updated:', p.path);
});

console.log('All mock pages generated successfully!');
