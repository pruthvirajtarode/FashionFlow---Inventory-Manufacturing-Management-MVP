import { getFabricRolls } from "@/actions/inventory"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Filter } from "lucide-react"

export const dynamic = "force-dynamic"

export default async function FabricInventoryPage() {
  const rolls = await getFabricRolls()

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Fabric Inventory</h2>
          <p className="text-muted-foreground">Manage and track individual fabric rolls in stock.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Filter className="mr-2 h-4 w-4" /> Filter</Button>
          <Button><Plus className="mr-2 h-4 w-4" /> Receive Roll</Button>
        </div>
      </div>

      <div className="bg-white rounded-lg border shadow-sm">
        <div className="p-4 border-b flex items-center">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search by barcode, SKU, or supplier..." className="pl-8" />
          </div>
        </div>
        <div className="relative w-full overflow-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50 hover:bg-slate-50">
                <TableHead>Barcode</TableHead>
                <TableHead>Fabric / SKU</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead className="text-right">Original Qty</TableHead>
                <TableHead className="text-right">Current Qty</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Received Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rolls.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-32 text-center text-muted-foreground">
                    No fabric rolls found. Receive a new roll to get started.
                  </TableCell>
                </TableRow>
              ) : (
                rolls.map((roll) => (
                  <TableRow key={roll.id} className="hover:bg-slate-50/50 cursor-pointer transition-colors">
                    <TableCell className="font-medium text-blue-600">{roll.barcode}</TableCell>
                    <TableCell>
                      <div className="font-medium">{roll.fabric.name}</div>
                      <div className="text-xs text-muted-foreground">{roll.fabric.sku} • {roll.fabric.material}</div>
                    </TableCell>
                    <TableCell>{roll.supplier || "-"}</TableCell>
                    <TableCell className="text-right">{roll.originalQty} <span className="text-xs text-muted-foreground">{roll.fabric.uom}</span></TableCell>
                    <TableCell className="text-right font-medium">{roll.currentQty} <span className="text-xs text-muted-foreground">{roll.fabric.uom}</span></TableCell>
                    <TableCell>
                      <Badge variant={
                        roll.status === "AVAILABLE" ? "default" :
                        roll.status === "IN_USE" ? "secondary" : "outline"
                      }>
                        {roll.status.replace('_', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground text-sm">
                      {new Date(roll.createdAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
