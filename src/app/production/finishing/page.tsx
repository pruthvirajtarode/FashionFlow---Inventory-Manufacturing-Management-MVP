import { BarcodeScannerForm } from "@/components/ui/barcode-scanner-form"

export default function FinishingPage() {
  return (
    <div className="py-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Finishing Process</h2>
          <p className="text-muted-foreground">Scan barcodes to process garments through the finishing stage (ironing, tags).</p>
        </div>
      </div>
      
      <BarcodeScannerForm 
        title="Finish Garment"
        description="Scan the garment barcode to mark it as FINISHED and ready for QC."
        expectedCurrentStage="CHECKED"
        newStage="FINISHED"
        allowRemarks={true}
      />
    </div>
  )
}
