"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getBarcodeTrace } from "@/actions/production"
import { Search, Package, Shirt, Clock, ArrowRight, User } from "lucide-react"

export default function BarcodeTracePage() {
  const [barcode, setBarcode] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [traceData, setTraceData] = useState<any>(null)
  const [error, setError] = useState("")

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!barcode.trim()) return
    
    setIsLoading(true)
    setError("")
    setTraceData(null)
    
    try {
      const result = await getBarcodeTrace(barcode.trim())
      if (!result) {
        setError("No record found for this barcode.")
      } else {
        setTraceData(result)
      }
    } catch (err: any) {
      setError(err.message || "Failed to search barcode.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto py-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Barcode Traceability</h2>
        <p className="text-muted-foreground">Search any barcode to view its complete digital audit trail.</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                value={barcode}
                onChange={(e) => setBarcode(e.target.value)}
                placeholder="Scan or enter barcode (e.g. ROLL-..., GAR-...)"
                className="pl-9 bg-slate-50"
                disabled={isLoading}
              />
            </div>
            <Button type="submit" disabled={isLoading || !barcode.trim()}>
              {isLoading ? "Searching..." : "Trace"}
            </Button>
          </form>
          {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
        </CardContent>
      </Card>

      {traceData && traceData.type === 'GARMENT' && (
        <div className="space-y-6">
          <Card className="border-blue-100 bg-blue-50/30">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Shirt className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Garment: {traceData.data.barcode}</CardTitle>
                    <CardDescription>{traceData.data.sku.product.name} ({traceData.data.sku.sku})</CardDescription>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">Current Status</div>
                  <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-white">
                    {traceData.data.status}
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Digital Audit Trail</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative border-l border-slate-200 ml-3 space-y-8">
                {traceData.data.statusHistory.map((history: any, idx: number) => (
                  <div key={idx} className="relative pl-6">
                    <div className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full bg-blue-500 ring-4 ring-white" />
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                      <div>
                        <div className="font-semibold">{history.status.replace('_', ' ')}</div>
                        {history.remarks && <p className="text-sm text-slate-500 mt-1">{history.remarks}</p>}
                        {history.userId && (
                          <div className="flex items-center gap-1 text-xs text-slate-400 mt-1">
                            <User className="h-3 w-3" /> User ID: {history.userId}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-slate-500 shrink-0">
                        <Clock className="h-3.5 w-3.5" />
                        {new Date(history.timestamp).toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
                {traceData.data.statusHistory.length === 0 && (
                  <div className="pl-6 text-sm text-muted-foreground">No history recorded yet.</div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {traceData && traceData.type === 'ROLL' && (
        <div className="space-y-6">
          <Card className="border-orange-100 bg-orange-50/30">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
                    <Package className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Fabric Roll: {traceData.data.barcode}</CardTitle>
                    <CardDescription>{traceData.data.fabric.name} ({traceData.data.fabric.sku})</CardDescription>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">Current Qty</div>
                  <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-white">
                    {traceData.data.currentQty} {traceData.data.fabric.uom}
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Inventory Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative border-l border-slate-200 ml-3 space-y-8">
                {traceData.data.transactions.map((tx: any, idx: number) => (
                  <div key={idx} className="relative pl-6">
                    <div className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full bg-orange-500 ring-4 ring-white" />
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                      <div>
                        <div className="font-semibold">{tx.type.replace('_', ' ')}</div>
                        <div className="flex items-center gap-2 mt-1 text-sm font-mono bg-slate-100 px-2 py-1 rounded inline-flex">
                          <span>{tx.beforeQty}</span>
                          <ArrowRight className="h-3 w-3" />
                          <span className={tx.afterQty < tx.beforeQty ? "text-red-600" : "text-emerald-600"}>
                            {tx.afterQty} {traceData.data.fabric.uom}
                          </span>
                        </div>
                        {tx.notes && <p className="text-sm text-slate-500 mt-1">{tx.notes}</p>}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-slate-500 shrink-0">
                        <Clock className="h-3.5 w-3.5" />
                        {new Date(tx.timestamp).toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
