import { calculateDOI } from "@/actions/planning"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export const dynamic = "force-dynamic"

export default async function ProductionPlanningPage() {
  const plans = await calculateDOI()

  return (
    <div className="py-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Production Planning (DOI)</h2>
          <p className="text-muted-foreground">Monitor Days of Inventory and calculate required garment production.</p>
        </div>
      </div>

      <div className="border rounded-lg bg-white overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50">
              <TableHead>SKU</TableHead>
              <TableHead>Product</TableHead>
              <TableHead className="text-right">Sales/Day</TableHead>
              <TableHead className="text-right">Current Stock</TableHead>
              <TableHead className="text-right">WIP</TableHead>
              <TableHead className="text-right font-semibold">DOI</TableHead>
              <TableHead className="text-right">Target Days</TableHead>
              <TableHead className="text-right text-blue-600 font-semibold">Cut Order Rec.</TableHead>
              <TableHead>Priority</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {plans.map((plan, i) => (
              <TableRow key={i}>
                <TableCell className="font-medium">{plan.sku}</TableCell>
                <TableCell>{plan.product}</TableCell>
                <TableCell className="text-right">{plan.wds}</TableCell>
                <TableCell className="text-right">{plan.currentStock}</TableCell>
                <TableCell className="text-right text-muted-foreground">{plan.wip}</TableCell>
                <TableCell className="text-right font-mono font-medium">{plan.doi}</TableCell>
                <TableCell className="text-right text-muted-foreground">{plan.targetDays}</TableCell>
                <TableCell className="text-right font-bold text-blue-600">
                  {plan.recommendedProduction > 0 ? `+${plan.recommendedProduction}` : "0"}
                </TableCell>
                <TableCell>
                  <Badge variant={
                    plan.priority === "CRITICAL" ? "destructive" :
                    plan.priority === "HIGH" ? "default" : "secondary"
                  }>
                    {plan.priority}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
            {plans.length === 0 && (
              <TableRow>
                <TableCell colSpan={9} className="h-24 text-center text-muted-foreground">
                  No SKUs found. Create products in the Master Data module.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
