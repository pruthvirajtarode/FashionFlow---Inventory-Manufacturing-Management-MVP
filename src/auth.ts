import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { prisma } from "./lib/prisma"
import bcrypt from "bcryptjs"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        
        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
          include: {
            userRoles: {
              include: { role: { include: { rolePermissions: { include: { permission: true } } } } }
            }
          }
        })
        
        if (!user || !user.active) return null
        
        const passwordsMatch = await bcrypt.compare(credentials.password as string, user.password)
        if (!passwordsMatch) return null
        
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          roles: user.userRoles.map(ur => ur.role.name),
          permissions: user.userRoles.flatMap(ur => ur.role.rolePermissions.map(rp => rp.permission.name))
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.roles = (user as any).roles
        token.permissions = (user as any).permissions
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string
        ;(session.user as any).roles = token.roles
        ;(session.user as any).permissions = token.permissions
      }
      return session
    }
  },
  pages: {
    signIn: '/login'
  }
})
