"use client"
import { BarcodeLabel } from "@/components/ui/barcode-label"
import { Button } from "@/components/ui/button"
import { Printer } from "lucide-react"
import { useSearchParams } from "next/navigation"

export default function PrintBarcodesPage() {
  const searchParams = useSearchParams()
  const idsParam = searchParams.get('ids')
  const ids = idsParam ? idsParam.split(',') : ["GAR-000001", "GAR-000002", "GAR-000003"]

  return (
    <div className="p-8 bg-white min-h-screen">
      <div className="mb-8 print:hidden flex justify-between items-center">
        <h1 className="text-2xl font-bold">Print Labels</h1>
        <Button onClick={() => window.print()}>
          <Printer className="mr-2 h-4 w-4" /> Print
        </Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 print:grid-cols-4 print:gap-4">
        {ids.map(id => (
          <BarcodeLabel key={id} value={id} title="FashionFlow" subtitle="Garment Tag" />
        ))}
      </div>
    </div>
  )
}
