import { BarcodeScannerForm } from "@/components/ui/barcode-scanner-form"

export default function CheckingPage() {
  return (
    <div className="py-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Checking Process</h2>
          <p className="text-muted-foreground">Scan barcodes to process garments through the checking stage.</p>
        </div>
      </div>
      
      <BarcodeScannerForm 
        title="Check Garment"
        description="Scan the garment barcode to mark it as CHECKED and ready for finishing."
        expectedCurrentStage="RECEIVED"
        newStage="CHECKED"
        allowRemarks={true}
      />
    </div>
  )
}
