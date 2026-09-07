"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { Sidebar } from "@/components/layout/sidebar"
import * as React from "react"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"

export function Header() {
  const [open, setOpen] = React.useState(false)

  return (
    <header className="h-16 border-b bg-white flex items-center justify-between px-4 lg:px-6 shadow-sm sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64">
            <VisuallyHidden>
              <SheetTitle>Navigation Menu</SheetTitle>
              <SheetDescription>Access all modules of the application.</SheetDescription>
            </VisuallyHidden>
            <Sidebar onNavigate={() => setOpen(false)} />
          </SheetContent>
        </Sheet>
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
