import { defineLocalSchema } from "supastash";

export async function initializeSchemas() {
  await defineLocalSchema("users", {
    id: "TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16))))",
    address: "TEXT NOT NULL",
    created_at: "TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP",
    created_by: "TEXT NOT NULL",
    email: "TEXT NOT NULL UNIQUE",
    full_name: "TEXT NOT NULL",
    is_active: "INTEGER NOT NULL DEFAULT 1",
    pfp: "TEXT NOT NULL",
    phone_number: "TEXT NOT NULL",
    role: "TEXT NOT NULL",
    synced_at: "TEXT DEFAULT NULL",
    updated_at: "TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP",
  });

  await defineLocalSchema("customers", {
    id: "TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16))))",
    address: "TEXT",
    created_at: "DATETIME DEFAULT CURRENT_TIMESTAMP",
    is_active: "INTEGER NOT NULL DEFAULT 1",
    name: "TEXT NOT NULL",
    phone: "TEXT UNIQUE",
    synced_at: "TEXT DEFAULT NULL",
    updated_at: "DATETIME DEFAULT CURRENT_TIMESTAMP",
  });

  await defineLocalSchema("sales", {
    id: "TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16))))",
    created_at: "TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP",
    customer_id: "TEXT NOT NULL",
    deposit: "REAL NOT NULL",
    last_edited_by: "TEXT NOT NULL",
    profit: "REAL NOT NULL",
    quantity: "INTEGER NOT NULL",
    sold_by: "TEXT NOT NULL",
    synced_at: "TEXT DEFAULT NULL",
    total_price: "REAL NOT NULL",
    updated_at: "TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP",
  });

  await defineLocalSchema("inventory", {
    id: "TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16))))",
    cost_price: "REAL NOT NULL",
    created_at: "TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP",
    created_by: "TEXT NOT NULL",
    increment: "INTEGER NOT NULL DEFAULT 0",
    is_active: "INTEGER NOT NULL DEFAULT 1",
    last_edited_by: "TEXT NOT NULL",
    name: "TEXT NOT NULL",
    original_selling_price: "REAL NOT NULL",
    quantity: "INTEGER NOT NULL",
    selling_price: "REAL NOT NULL",
    size: "INTEGER NOT NULL DEFAULT 24",
    synced_at: "TEXT DEFAULT NULL",
    unit: "TEXT NOT NULL DEFAULT 'pcs'",
    updated_at: "TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP",
  });

  await defineLocalSchema("sellers_inventory", {
    id: "TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16))))",
    created_at: "TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP",
    item_id: "TEXT NOT NULL",
    quantity_at_hand: "INTEGER DEFAULT 0",
    seller: "TEXT NOT NULL",
    synced_at: "TEXT DEFAULT NULL",
    updated_at: "TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP",
  });

  await defineLocalSchema("inventory_transfers", {
    id: "TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16))))",
    created_at: "TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP",
    received_by: "TEXT NOT NULL",
    synced_at: "TEXT DEFAULT NULL",
    transferred_by: "TEXT NOT NULL",
    updated_at: "TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP",
  });

  await defineLocalSchema("returns", {
    id: "TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16))))",
    created_at: "TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP",
    item_id: "TEXT NOT NULL",
    quantity: "INTEGER NOT NULL",
    returned_by: "TEXT NOT NULL",
    seller: "TEXT NOT NULL",
    synced_at: "TEXT DEFAULT NULL",
    updated_at: "TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP",
  });

  await defineLocalSchema("expenses", {
    id: "TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16))))",
    cost: "REAL NOT NULL",
    created_at: "TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP",
    created_by: "TEXT NOT NULL",
    last_edited_by: "TEXT NOT NULL",
    reason: "TEXT NOT NULL",
    synced_at: "TEXT DEFAULT NULL",
    updated_at: "TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP",
  });

  await defineLocalSchema("sold_items", {
    id: "TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16))))",
    created_at: "TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP",
    item_id: "TEXT NOT NULL",
    last_edited_by: "TEXT NOT NULL",
    quantity: "INTEGER NOT NULL",
    sales_id: "TEXT NOT NULL",
    synced_at: "TEXT DEFAULT NULL",
    total_price: "REAL NOT NULL",
    updated_at: "TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP",
  });

  await defineLocalSchema("transfer_items", {
    id: "TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16))))",
    created_at: "TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP",
    inventory_id: "TEXT NOT NULL",
    last_edited_by: "TEXT NOT NULL",
    quantity_moved: "INTEGER NOT NULL",
    synced_at: "TEXT DEFAULT NULL",
    transfer_id: "TEXT NOT NULL",
    updated_at: "TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP",
  });

  await defineLocalSchema("purchases", {
    id: "TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16))))",
    created_at: "TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP",
    purchased_by: "TEXT",
    synced_at: "TEXT DEFAULT NULL",
    updated_at: "TEXT DEFAULT CURRENT_TIMESTAMP",
  });

  await defineLocalSchema("purchased_items", {
    id: "TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16))))",
    created_at: "TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP",
    inventory_id: "TEXT",
    last_edited_by: "TEXT",
    purchase_id: "TEXT",
    quantity: "INTEGER DEFAULT 0",
    synced_at: "TEXT DEFAULT NULL",
    updated_at: "TEXT DEFAULT CURRENT_TIMESTAMP",
  });
}
