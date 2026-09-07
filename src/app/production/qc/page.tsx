import { BarcodeScannerForm } from "@/components/ui/barcode-scanner-form"

export default function QCPage() {
  return (
    <div className="py-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Quality Control (QC)</h2>
          <p className="text-muted-foreground">Scan barcodes to Pass or Fail garments in Quality Control.</p>
        </div>
      </div>
      
      <BarcodeScannerForm 
        title="Quality Control Inspection"
        description="Inspect the garment. Scan the barcode to PASS, or click Reject to mark as QC_FAILED."
        expectedCurrentStage="FINISHED"
        newStage="QC_PASSED"
        rejectStage="QC_FAILED"
        allowRemarks={true}
      />
    </div>
  )
}
