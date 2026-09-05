import React from 'react'
import Barcode from 'react-barcode'

interface BarcodeLabelProps {
  value: string;
  title?: string;
  subtitle?: string;
  width?: number;
  height?: number;
}

export function BarcodeLabel({ value, title, subtitle, width = 1.5, height = 50 }: BarcodeLabelProps) {
  return (
    <div className="flex flex-col items-center justify-center p-4 border rounded-md bg-white w-fit">
      {title && <h3 className="font-bold text-lg">{title}</h3>}
      {subtitle && <p className="text-sm text-slate-500 mb-2">{subtitle}</p>}
      <Barcode value={value} width={width} height={height} displayValue={true} />
    </div>
  )
}
