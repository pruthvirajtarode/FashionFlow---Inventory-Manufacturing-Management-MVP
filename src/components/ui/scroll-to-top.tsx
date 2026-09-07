"use client"

import { useState, useEffect } from "react"
import { ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const mainElement = document.querySelector('main')
    
    const toggleVisibility = () => {
      if (mainElement && mainElement.scrollTop > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    if (mainElement) {
      mainElement.addEventListener("scroll", toggleVisibility)
      return () => mainElement.removeEventListener("scroll", toggleVisibility)
    }
  }, [])

  const scrollToTop = () => {
    const mainElement = document.querySelector('main')
    if (mainElement) {
      mainElement.scrollTo({
        top: 0,
        behavior: "smooth"
      })
    }
  }

  if (!isVisible) {
    return null
  }

  return (
    <Button
      variant="default"
      size="icon"
      className="fixed bottom-8 right-8 h-12 w-12 rounded-full shadow-lg z-50 transition-all duration-300 hover:scale-110 bg-blue-600 hover:bg-blue-700"
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <ArrowUp className="h-6 w-6 text-white" />
    </Button>
  )
}
