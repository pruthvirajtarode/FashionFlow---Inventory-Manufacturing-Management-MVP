import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"

export function Header() {
  return (
    <header className="h-16 border-b bg-white flex items-center justify-between px-4 lg:px-6 shadow-sm">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold text-slate-800 hidden sm:block">Dashboard</h1>
      </div>
      <div className="flex items-center gap-4">
        <Avatar className="h-8 w-8 cursor-pointer border border-slate-200">
          <AvatarImage src="" />
          <AvatarFallback className="bg-blue-100 text-blue-700">A</AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
