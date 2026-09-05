# FashionFlow Workflows

## 1. Fabric Roll Lifecycle
`AVAILABLE` → `PARTIALLY_ISSUED` → `ISSUED` → `IN_CUTTING` → `CONSUMED`
- A roll is scanned to deduct quantity during the **Cutting Issue** phase.
- An append-only transaction is recorded in `FabricInventoryTransaction`.

## 2. Garment Lifecycle
`CUT` → `WITH_FABRICATOR` → `RECEIVED` → `CHECKING` → `FINISHING` → `QC` → `PACKED` → `FINAL_INVENTORY` → `SOLD`
- Each transition uses the `moveGarmentStage` server action, which validates the state machine flow.
- A log is written to `GarmentStatusHistory` for traceability.

## 3. Shopify Integration
- Webhooks arrive at `/api/webhooks/shopify`.
- `x-shopify-webhook-id` ensures idempotency (no duplicate processing).
- If `topic` is `orders/fulfilled`, the app finds the local SKU and records a `SALE` transaction in `GarmentInventoryTransaction`, deducting the available Final Inventory.

## 4. DOI & Planning
- `WDS (Weighted Daily Sales)` is calculated using 7/15/30-day velocity weights.
- `DOI` = `Current Stock / WDS`.
- `Recommended Production` = `(WDS * 15 Days) - (Current Stock + WIP)`.
