"use client"

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { 
  LayoutDashboard, Package, Shirt, Scissors, Truck,
  CheckSquare, CheckCircle, PackageCheck, FileText,
  BarChart, Users, Settings, Activity, ShoppingCart, Menu
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
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div className={cn(
      "flex flex-col h-full bg-slate-950 text-slate-300 flex-shrink-0 border-r border-slate-800 transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      <div className={cn(
        "p-4 flex items-center border-b border-slate-800",
        isCollapsed ? "justify-center" : "justify-between"
      )}>
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="h-8 w-8 bg-blue-600 rounded-md flex items-center justify-center text-white font-bold shrink-0">FF</div>
          {!isCollapsed && <span className="text-xl font-bold text-white tracking-tight whitespace-nowrap">FashionFlow</span>}
        </div>
        {!isCollapsed && (
          <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white" onClick={() => setIsCollapsed(true)}>
            <Menu className="h-5 w-5" />
          </Button>
        )}
      </div>
      
      {isCollapsed && (
        <div className="flex justify-center p-2 border-b border-slate-800">
          <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white" onClick={() => setIsCollapsed(false)}>
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      )}

      <div className="flex-1 overflow-y-auto overflow-x-hidden py-4 custom-scrollbar">
        {routes.map((group, idx) => (
          <div key={idx} className="mb-6 px-2">
            {!isCollapsed && (
              <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap">
                {group.heading}
              </h3>
            )}
            <div className="space-y-1">
              {group.items.map((item, i) => (
                <Link key={i} href={item.path} onClick={onNavigate}>
                  <Button 
                    variant="ghost" 
                    className={cn(
                      "w-full text-slate-400 hover:text-white hover:bg-slate-800",
                      isCollapsed ? "justify-center px-0" : "justify-start px-3"
                    )}
                    title={isCollapsed ? item.name : undefined}
                  >
                    <item.icon className={cn("h-4 w-4 shrink-0", !isCollapsed && "mr-3")} />
                    {!isCollapsed && <span className="truncate">{item.name}</span>}
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
