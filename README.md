# FashionFlow - Inventory & Manufacturing Management

FashionFlow is a production-ready MVP web application designed for a fashion brand to manage fabric inventory, garment production, barcode-based traceability, and Shopify stock synchronization.

## Features Included in MVP
- **Role-Based Access Control**: Admin and Worker roles powered by NextAuth.js.
- **Master Data**: Fabric, SKU, and Fabricator master management.
- **Barcode Tracing**: Scanner hook and printable label views for garments and fabric rolls.
- **Production Tracking**: 
  - Fabric Roll receipt and issue.
  - Cutting batch management.
  - Fabricator Challans (issued and scan-based receiving).
  - Shop-floor stage movements (Checking, Finishing, QC, Packing).
- **Final Inventory**: Append-only ledgers for garments, automatically aggregating final stock.
- **Production Planning**: Calculation of Days of Inventory (DOI) and target stock recommendations.
- **Shopify Webhooks**: Idempotent order fulfillment processing mapped to SKU inventory.

## Architecture & Tech Stack
- **Frontend**: Next.js 14+ (App Router), React, Tailwind CSS, shadcn/ui, `lucide-react`
- **Backend**: Next.js Server Actions & API Routes, Zod validation
- **Database**: Prisma ORM with SQLite (can be easily switched to PostgreSQL)
- **Auth**: NextAuth.js (v5 Beta)

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Database Initialization**
   The project uses SQLite for fast local development.
   ```bash
   npx prisma db push
   ```

3. **Seed Test Data**
   Populate roles, permissions, and test users.
   ```bash
   npx tsx prisma/seed.ts
   ```
   **Test Credentials:**
   - Admin: `admin@fashionflow.local` / `password123`
   - Worker: `worker@fashionflow.local` / `password123`

4. **Run Application**
   ```bash
   npm run dev
   ```
   Access the app at `http://localhost:3000`

## Documentation
- Workflows and business logic are detailed in the `/docs` folder.
