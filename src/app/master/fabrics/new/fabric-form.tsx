"use client"
// @ts-nocheck

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { createFabric } from "@/actions/fabric"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

const fabricSchema = z.object({
  sku: z.string().min(1, "SKU is required"),
  name: z.string().min(1, "Name is required"),
  type: z.string().min(1, "Type is required"),
  material: z.string().min(1, "Material is required"),
  color: z.string().min(1, "Color is required"),
  gsm: z.coerce.number().optional(),
  width: z.coerce.number().optional(),
  uom: z.string().default("meters"),
  avgCost: z.coerce.number().optional(),
  supplier: z.string().optional(),
  minimumStock: z.coerce.number().default(0),
  targetDays: z.coerce.number().default(30),
})

export function FabricForm() {
  const router = useRouter()
  const form = useForm<z.infer<typeof fabricSchema>>({
    resolver: zodResolver(fabricSchema) as any,
    defaultValues: {
      uom: "meters",
      minimumStock: 0,
      targetDays: 30,
    },
  })

  async function onSubmit(values: z.infer<typeof fabricSchema>) {
    const res = await createFabric(values)
    if (res.success) {
      toast.success("Fabric created successfully")
      router.push("/master/fabrics")
    } else {
      toast.error(res.error || "Failed to create fabric")
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit as any)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField control={form.control as any} name="sku" render={({ field }) => (
            <FormItem><FormLabel>SKU</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control as any} name="name" render={({ field }) => (
            <FormItem><FormLabel>Fabric Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control as any} name="type" render={({ field }) => (
            <FormItem><FormLabel>Type (e.g. Woven)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control as any} name="material" render={({ field }) => (
            <FormItem><FormLabel>Material (e.g. 100% Cotton)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control as any} name="color" render={({ field }) => (
            <FormItem><FormLabel>Color</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control as any} name="gsm" render={({ field }) => (
            <FormItem><FormLabel>GSM</FormLabel><FormControl><Input type="number" {...field} value={field.value || ''} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control as any} name="width" render={({ field }) => (
            <FormItem><FormLabel>Width (inches)</FormLabel><FormControl><Input type="number" {...field} value={field.value || ''} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control as any} name="uom" render={({ field }) => (
            <FormItem><FormLabel>Unit of Measure</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control as any} name="minimumStock" render={({ field }) => (
            <FormItem><FormLabel>Minimum Stock</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control as any} name="targetDays" render={({ field }) => (
            <FormItem><FormLabel>Target Days</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
          )} />
        </div>
        <Button type="submit">Save Fabric</Button>
      </form>
    </Form>
  )
}
