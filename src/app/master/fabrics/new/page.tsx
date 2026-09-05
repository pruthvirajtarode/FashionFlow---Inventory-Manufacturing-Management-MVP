import { FabricForm } from "./fabric-form"

export default function NewFabricPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Add New Fabric</h2>
        <p className="text-muted-foreground">Create a new fabric master record.</p>
      </div>
      <div className="p-6 border rounded-lg bg-white shadow-sm">
        <FabricForm />
      </div>
    </div>
  )
}
