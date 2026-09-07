import { calculateFabricDOI } from "@/actions/planning"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export const dynamic = "force-dynamic"

export default async function FabricPlanningPage() {
  const plans = await calculateFabricDOI()

  return (
    <div className="py-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Fabric Planning (DOI)</h2>
          <p className="text-muted-foreground">Monitor fabric consumption and calculate purchasing requirements to maintain target stock.</p>
        </div>
      </div>

      <div className="border rounded-lg bg-white overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50">
              <TableHead>Fabric SKU</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Daily Demand</TableHead>
              <TableHead className="text-right">Current Stock</TableHead>
              <TableHead className="text-right font-semibold">DOI</TableHead>
              <TableHead className="text-right">Target Days</TableHead>
              <TableHead className="text-right text-orange-600 font-semibold">Order Rec.</TableHead>
              <TableHead>Priority</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {plans.map((plan, i) => (
              <TableRow key={i}>
                <TableCell className="font-medium">{plan.fabricSku}</TableCell>
                <TableCell>
                  <div>{plan.name}</div>
                  <div className="text-xs text-muted-foreground">{plan.material}</div>
                </TableCell>
                <TableCell className="text-right">{plan.dailyDemand} <span className="text-xs text-muted-foreground">{plan.uom}</span></TableCell>
                <TableCell className="text-right">{plan.currentStock} <span className="text-xs text-muted-foreground">{plan.uom}</span></TableCell>
                <TableCell className="text-right font-mono font-medium">{plan.doi}</TableCell>
                <TableCell className="text-right text-muted-foreground">{plan.targetDays}</TableCell>
                <TableCell className="text-right font-bold text-orange-600">
                  {Number(plan.recommendedOrder) > 0 ? `+${plan.recommendedOrder}` : "0"} <span className="text-xs font-normal">{plan.uom}</span>
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
                <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">
                  No fabrics found. Create fabrics in the Master Data module.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
