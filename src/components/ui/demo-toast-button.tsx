"use client"

import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import React from "react"

interface DemoToastButtonProps extends React.ComponentProps<typeof Button> {
  featureName?: string
  message?: string
}

export function DemoToastButton({ featureName, message, ...props }: DemoToastButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if ((props as any).onClick) {
      (props as any).onClick(e)
    } else {
      toast(message || `Feature coming soon!`, {
        description: featureName 
          ? `The ${featureName} module is currently in development for the MVP.`
          : `This feature is currently in development.`,
        action: {
          label: "Dismiss",
          onClick: () => console.log("Dismissed"),
        },
      })
    }
  }

  return <Button onClick={handleClick} {...props} />
}
