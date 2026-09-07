import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  // Completely disable authentication for the client demo MVP
  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
