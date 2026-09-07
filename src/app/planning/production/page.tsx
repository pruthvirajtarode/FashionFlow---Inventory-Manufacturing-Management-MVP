import { AlertCircle } from "lucide-react"

export default function ProductionPage() {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-center">
      <AlertCircle className="h-16 w-16 text-slate-400 mb-4" />
      <h1 className="text-3xl font-bold tracking-tight mb-2">Production (Coming Soon)</h1>
      <p className="text-muted-foreground max-w-md text-lg">
        This module is currently under development. Please check back later.
      </p>
    </div>
  )
}
