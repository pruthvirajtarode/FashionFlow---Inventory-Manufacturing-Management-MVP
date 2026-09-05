import { getFabrics } from "@/actions/fabric"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Plus } from "lucide-react"

export default async function FabricsPage() {
  const fabrics = await getFabrics()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Fabric Master</h2>
          <p className="text-muted-foreground">Manage fabric definitions and requirements.</p>
        </div>
        <Link href="/master/fabrics/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Fabric
          </Button>
        </Link>
      </div>

      <div className="border rounded-lg bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>SKU</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Type/Material</TableHead>
              <TableHead>Color</TableHead>
              <TableHead>Min Stock</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fabrics.map(fabric => (
              <TableRow key={fabric.id}>
                <TableCell className="font-medium">{fabric.sku}</TableCell>
                <TableCell>{fabric.name}</TableCell>
                <TableCell>{fabric.type} / {fabric.material}</TableCell>
                <TableCell>{fabric.color}</TableCell>
                <TableCell>{fabric.minimumStock} {fabric.uom}</TableCell>
                <TableCell>
                  <Badge variant={fabric.active ? "default" : "secondary"}>
                    {fabric.active ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
            {fabrics.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No fabrics found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
