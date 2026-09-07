import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const { pathname } = req.nextUrl
  
  // Public routes
  if (pathname.startsWith('/login') || pathname.startsWith('/api/auth')) {
    return NextResponse.next()
  }

  // Require authentication for all other routes
  if (!isLoggedIn) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  // RBAC (Role-Based Access Control)
  const roles = (req.auth?.user as any)?.roles || []
  const isAdmin = roles.includes("ADMIN")

  // Admins bypass all role restrictions
  if (isAdmin) {
    return NextResponse.next()
  }

  // Define restricted route prefixes and their required roles
  const restrictions = [
    { prefix: "/admin", allowedRoles: [] }, // Only Admin (handled above)
    { prefix: "/production", allowedRoles: ["PRODUCTION"] },
    { prefix: "/cutting", allowedRoles: ["PRODUCTION"] },
    { prefix: "/challans", allowedRoles: ["PRODUCTION"] },
    { prefix: "/receiving", allowedRoles: ["PRODUCTION"] },
    { prefix: "/inventory", allowedRoles: ["INVENTORY"] },
    { prefix: "/barcodes", allowedRoles: ["INVENTORY", "PRODUCTION"] },
    { prefix: "/planning", allowedRoles: ["PLANNING"] },
    { prefix: "/master", allowedRoles: ["PLANNING", "INVENTORY"] },
  ]

  for (const rule of restrictions) {
    if (pathname.startsWith(rule.prefix)) {
      const hasPermission = rule.allowedRoles.some(role => roles.includes(role))
      if (!hasPermission) {
        // Redirect unauthorized users back to dashboard
        return NextResponse.redirect(new URL('/dashboard', req.url))
      }
    }
  }

  return NextResponse.next()
})

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
