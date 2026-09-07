import { BarcodeScannerForm } from "@/components/ui/barcode-scanner-form"

export default function PackingPage() {
  return (
    <div className="py-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Packing & Final Inventory</h2>
          <p className="text-muted-foreground">Scan barcodes to pack garments and move them to final ready stock.</p>
        </div>
      </div>
      
      <BarcodeScannerForm 
        title="Pack Garment"
        description="Scan the garment barcode to mark it as PACKED (Final Inventory). This will increase your ready stock quantity."
        expectedCurrentStage="QC_PASSED"
        newStage="FINAL_INVENTORY"
        allowRemarks={true}
      />
    </div>
  )
}
