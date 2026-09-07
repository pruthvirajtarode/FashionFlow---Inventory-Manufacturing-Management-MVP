"use client"

import { Input } from "@/components/ui/input"
import { DemoToastButton } from "@/components/ui/demo-toast-button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Filter, Download } from "lucide-react"
import { toast } from "sonner"

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
          <DemoToastButton variant="outline" featureName="Export to CSV"><Download className="mr-2 h-4 w-4" /> Export</DemoToastButton>
          <DemoToastButton featureName={primaryAction}><Plus className="mr-2 h-4 w-4" /> {primaryAction}</DemoToastButton>
        </div>
      </div>

      <div className="bg-white rounded-lg border shadow-sm">
        <div className="p-4 border-b flex items-center justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search records..." className="pl-8" />
          </div>
          <DemoToastButton variant="outline" size="sm" className="hidden sm:flex" featureName="Filters">
            <Filter className="mr-2 h-4 w-4" /> Filter
          </DemoToastButton>
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
                <TableRow key={i} className="hover:bg-slate-50/50 cursor-pointer transition-colors" onClick={() => {
                  toast("Record Details", { description: "Opening detail view for this record is not available in the demo." })
                }}>
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
            <DemoToastButton variant="outline" size="sm" disabled featureName="Pagination">Previous</DemoToastButton>
            <DemoToastButton variant="outline" size="sm" featureName="Pagination">Next</DemoToastButton>
          </div>
        </div>
      </div>
    </div>
  )
}
