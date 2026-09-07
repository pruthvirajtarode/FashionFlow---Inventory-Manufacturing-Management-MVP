import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { 
  LayoutDashboard, Package, Shirt, Scissors, Truck,
  CheckSquare, CheckCircle, PackageCheck, FileText,
  BarChart, Users, Settings, Activity, ShoppingCart
} from 'lucide-react'

const routes = [
  {
    heading: 'Overview',
    items: [
      { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
      { name: 'Barcode Trace', path: '/barcodes/trace', icon: Activity }
    ]
  },
  {
    heading: 'Inventory',
    items: [
      { name: 'Fabric Inventory', path: '/inventory/fabric', icon: Package },
      { name: 'Garment Inventory', path: '/inventory/garments', icon: Shirt },
      { name: 'SKU Master', path: '/inventory/sku', icon: FileText },
      { name: 'Fabric Master', path: '/master/fabrics', icon: FileText },
    ]
  },
  {
    heading: 'Production',
    items: [
      { name: 'Cutting', path: '/cutting', icon: Scissors },
      { name: 'Fabricators', path: '/master/fabricators', icon: Users },
      { name: 'Challans', path: '/challans', icon: FileText },
      { name: 'Receiving', path: '/receiving', icon: Truck },
      { name: 'Checking', path: '/production/checking', icon: CheckSquare },
      { name: 'Finishing', path: '/production/finishing', icon: CheckCircle },
      { name: 'QC', path: '/production/qc', icon: Activity },
      { name: 'Packing', path: '/production/packing', icon: PackageCheck },
    ]
  },
  {
    heading: 'Planning',
    items: [
      { name: 'Production Planning', path: '/planning/production', icon: BarChart },
      { name: 'Fabric Planning', path: '/planning/fabric', icon: BarChart },
    ]
  },
  {
    heading: 'Integrations',
    items: [
      { name: 'Shopify', path: '/integrations/shopify', icon: ShoppingCart },
    ]
  },
  {
    heading: 'Admin',
    items: [
      { name: 'Users', path: '/admin/users', icon: Users },
      { name: 'Roles', path: '/admin/roles', icon: Users },
      { name: 'Settings', path: '/admin/settings', icon: Settings },
    ]
  }
]

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex flex-col h-full bg-slate-950 text-slate-300 w-64 flex-shrink-0 border-r border-slate-800">
      <div className="p-4 flex items-center gap-2 border-b border-slate-800">
        <div className="h-8 w-8 bg-blue-600 rounded-md flex items-center justify-center text-white font-bold">FF</div>
        <span className="text-xl font-bold text-white tracking-tight">FashionFlow</span>
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        {routes.map((group, idx) => (
          <div key={idx} className="mb-6 px-3">
            <h3 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
              {group.heading}
            </h3>
            <div className="space-y-1">
              {group.items.map((item, i) => (
                <Link key={i} href={item.path} onClick={onNavigate}>
                  <Button variant="ghost" className="w-full justify-start text-slate-400 hover:text-white hover:bg-slate-800">
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.name}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
