import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function GET() {
  try {
    // 1. Create permissions
    const permissionsData = [
      'inventory.view', 'inventory.create', 'inventory.update', 'inventory.adjust',
      'fabric.view', 'fabric.create', 'fabric.issue',
      'cutting.view', 'cutting.create', 'cutting.confirm',
      'fabricator.view',
      'challan.create', 'challan.issue',
      'receiving.view', 'receiving.process',
      'checking.process', 'finishing.process', 'qc.process', 'packing.process',
      'reports.view',
      'users.view', 'users.create', 'users.update',
      'roles.manage',
      'shopify.view', 'shopify.sync',
      'audit.view'
    ]

    const permissions = []
    for (const p of permissionsData) {
      let perm = await prisma.permission.findUnique({ where: { name: p } })
      if (!perm) {
        perm = await prisma.permission.create({ data: { name: p } })
      }
      permissions.push(perm)
    }

    // 2. Create Admin Role
    let adminRole = await prisma.role.findUnique({ where: { name: 'Admin' } })
    if (!adminRole) {
      adminRole = await prisma.role.create({ data: { name: 'Admin', description: 'Full access' } })
      
      // Assign all permissions to Admin
      for (const perm of permissions) {
        await prisma.rolePermission.create({
          data: { roleId: adminRole.id, permissionId: perm.id }
        })
      }
    }

    // 3. Create Admin User
    const adminEmail = 'admin@fashionflow.local'
    let adminUser = await prisma.user.findUnique({ where: { email: adminEmail } })
    
    if (!adminUser) {
      const password = await bcrypt.hash('password123', 10)
      adminUser = await prisma.user.create({
        data: { name: 'Admin User', email: adminEmail, password, active: true }
      })
      
      await prisma.userRole.create({ 
        data: { userId: adminUser.id, roleId: adminRole.id } 
      })
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Database seeded successfully. You can now login with admin@fashionflow.local and password123' 
    })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
