import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Clear existing
  await prisma.rolePermission.deleteMany()
  await prisma.userRole.deleteMany()
  await prisma.permission.deleteMany()
  await prisma.role.deleteMany()
  await prisma.user.deleteMany()

  // Permissions
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
    const perm = await prisma.permission.create({ data: { name: p } })
    permissions.push(perm)
  }

  // Roles
  const adminRole = await prisma.role.create({ data: { name: 'Admin', description: 'Full access' } })
  const inventoryManagerRole = await prisma.role.create({ data: { name: 'Inventory Manager' } })
  const cuttingMasterRole = await prisma.role.create({ data: { name: 'Cutting Master' } })
  const workerRole = await prisma.role.create({ data: { name: 'Worker' } })

  // Assign all permissions to Admin
  for (const perm of permissions) {
    await prisma.rolePermission.create({
      data: { roleId: adminRole.id, permissionId: perm.id }
    })
  }

  // Assign basic to worker
  const workerPerms = ['checking.process', 'finishing.process', 'qc.process', 'packing.process', 'receiving.process']
  for (const p of workerPerms) {
    const perm = permissions.find(x => x.name === p)
    if (perm) {
      await prisma.rolePermission.create({
        data: { roleId: workerRole.id, permissionId: perm.id }
      })
    }
  }

  // Users
  const password = await bcrypt.hash('password123', 10)
  
  const adminUser = await prisma.user.create({
    data: { name: 'Admin User', email: 'admin@fashionflow.local', password, active: true }
  })
  await prisma.userRole.create({ data: { userId: adminUser.id, roleId: adminRole.id } })

  const workerUser = await prisma.user.create({
    data: { name: 'Shop Floor Worker', email: 'worker@fashionflow.local', password, active: true }
  })
  await prisma.userRole.create({ data: { userId: workerUser.id, roleId: workerRole.id } })

  console.log('Seeded database with roles and users.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
