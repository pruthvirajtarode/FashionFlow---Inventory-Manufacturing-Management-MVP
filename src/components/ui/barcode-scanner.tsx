"use client"

import React, { useState, useEffect, useRef } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Camera, Keyboard } from 'lucide-react'

interface BarcodeScannerProps {
  onScan: (barcode: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
}

export function BarcodeScanner({ onScan, placeholder = "Scan barcode...", autoFocus = true }: BarcodeScannerProps) {
  const [inputValue, setInputValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus()
    }
  }, [autoFocus])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (inputValue.trim()) {
        onScan(inputValue.trim())
        setInputValue('') // Clear after scan
      }
    }
  }

  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <div className="relative flex-1">
        <Input 
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="pr-10 h-12 text-lg"
          autoComplete="off"
        />
        <Keyboard className="absolute right-3 top-3 h-6 w-6 text-slate-300" />
      </div>
      <Button variant="outline" className="h-12 w-12 p-0" onClick={() => alert("Camera scan not implemented in MVP yet")}>
        <Camera className="h-6 w-6" />
      </Button>
    </div>
  )
}
