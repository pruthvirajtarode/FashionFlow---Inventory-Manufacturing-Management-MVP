"use client"

import { useState, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, CheckCircle2, ScanLine } from "lucide-react"
import { moveGarmentStage } from "@/actions/production"
import { toast } from "sonner"
import { useSession } from "next-auth/react"

interface ScanResult {
  barcode: string
  success: boolean
  message: string
  timestamp: Date
}

interface BarcodeScannerFormProps {
  title: string
  description: string
  expectedCurrentStage: string
  newStage: string
  rejectStage?: string
  allowRemarks?: boolean
}

export function BarcodeScannerForm({ title, description, expectedCurrentStage, newStage, rejectStage, allowRemarks = false }: BarcodeScannerFormProps) {
  const [barcode, setBarcode] = useState("")
  const [remarks, setRemarks] = useState("")
  const [isScanning, setIsScanning] = useState(false)
  const [scanHistory, setScanHistory] = useState<ScanResult[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  
  const sessionContext = useSession()
  const session = sessionContext?.data

  // Auto-focus input for physical barcode scanners
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleScan = async (e: React.FormEvent, isReject = false) => {
    e.preventDefault()
    if (!barcode.trim()) return

    const currentBarcode = barcode.trim()
    setBarcode("") // Clear immediately for next scan
    setIsScanning(true)
    
    const targetStage = isReject && rejectStage ? rejectStage : newStage

    try {
      const result = await moveGarmentStage(
        currentBarcode,
        targetStage,
        expectedCurrentStage,
        allowRemarks ? remarks : undefined,
        (session?.user as any)?.id // Pass user ID if available
      )

      if (result.success) {
        toast.success(`Successfully scanned ${currentBarcode}`)
        setScanHistory(prev => [{
          barcode: currentBarcode,
          success: true,
          message: `Moved to ${targetStage}`,
          timestamp: new Date()
        }, ...prev].slice(0, 10)) // Keep last 10
      } else {
        const errorMsg = (result as any).error || "Unknown error"
        toast.error(`Failed: ${errorMsg}`)
        setScanHistory(prev => [{
          barcode: currentBarcode,
          success: false,
          message: errorMsg,
          timestamp: new Date()
        }, ...prev].slice(0, 10))
      }
    } catch (error: any) {
      toast.error(`Error scanning barcode`)
      setScanHistory(prev => [{
        barcode: currentBarcode,
        success: false,
        message: error.message || "Network error",
        timestamp: new Date()
      }, ...prev].slice(0, 10))
    } finally {
      setIsScanning(false)
      inputRef.current?.focus() // Refocus after scan
    }
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
              <ScanLine className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <CardTitle>{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleScan} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="barcode" className="text-sm font-medium">Scan Barcode</label>
              <Input
                id="barcode"
                ref={inputRef}
                value={barcode}
                onChange={(e) => setBarcode(e.target.value)}
                placeholder="Click here and scan..."
                className="text-lg py-6 bg-slate-50"
                disabled={isScanning}
                autoComplete="off"
                autoFocus
              />
            </div>
            
            {allowRemarks && (
              <div className="space-y-2">
                <label htmlFor="remarks" className="text-sm font-medium">Remarks (Optional)</label>
                <Input
                  id="remarks"
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  placeholder="E.g., Missing button, stains..."
                  disabled={isScanning}
                />
              </div>
            )}
            
            {rejectStage ? (
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  type="button" 
                  variant="destructive"
                  className="w-full" 
                  disabled={isScanning || !barcode.trim()}
                  onClick={(e) => handleScan(e, true)}
                >
                  {isScanning ? "Processing..." : "Reject (Fail)"}
                </Button>
                <Button 
                  type="submit" 
                  className="w-full bg-emerald-600 hover:bg-emerald-700" 
                  disabled={isScanning || !barcode.trim()}
                >
                  {isScanning ? "Processing..." : "Pass"}
                </Button>
              </div>
            ) : (
              <Button type="submit" className="w-full" disabled={isScanning || !barcode.trim()}>
                {isScanning ? "Processing..." : "Process Scan (Enter)"}
              </Button>
            )}
          </form>
        </CardContent>
      </Card>

      {scanHistory.length > 0 && (
        <Card>
          <CardHeader className="py-4">
            <CardTitle className="text-lg">Recent Scans</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {scanHistory.map((scan, idx) => (
              <div key={idx} className={`flex items-center justify-between p-3 rounded-lg border ${scan.success ? 'bg-emerald-50/50 border-emerald-100' : 'bg-red-50/50 border-red-100'}`}>
                <div className="flex items-center gap-3">
                  {scan.success ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  )}
                  <div>
                    <div className="font-medium font-mono text-sm">{scan.barcode}</div>
                    <div className={`text-xs ${scan.success ? 'text-emerald-700' : 'text-red-700'}`}>
                      {scan.message}
                    </div>
                  </div>
                </div>
                <div className="text-xs text-slate-500">
                  {scan.timestamp.toLocaleTimeString()}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
