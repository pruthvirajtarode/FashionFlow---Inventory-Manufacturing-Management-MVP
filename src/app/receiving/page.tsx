import { BarcodeScannerForm } from "@/components/ui/barcode-scanner-form"

export default function ReceivingPage() {
  return (
    <div className="py-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Receiving (Inward)</h2>
          <p className="text-muted-foreground">Scan barcodes to log inward shipments of stitched garments from fabricators.</p>
        </div>
      </div>
      
      <BarcodeScannerForm 
        title="Receive Garment"
        description="Scan the garment barcode to receive it from the fabricator and mark it for checking."
        expectedCurrentStage="TRANSIT_OUT"
        newStage="RECEIVED"
        allowRemarks={true}
      />
    </div>
  )
}
