import { showToast } from "@/utils/notification";
import { getDb } from "./database";

export const setupDatabase = async () => {
  console.log("setting up..");
  const db = await getDb();

  try {
    await db.execAsync(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      full_name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      phone_number TEXT NOT NULL,
      role TEXT NOT NULL, 
      is_active INTEGER NOT NULL DEFAULT 1, 
      pfp TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      created_by TEXT NOT NULL,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      address TEXT NOT NULL,
      deleted INTEGER NOT NULL DEFAULT 0,
      synced_at TEXT DEFAULT NULL,
      FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE
    );
  `);

    await db.execAsync(`
    CREATE TABLE IF NOT EXISTS customers (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      phone TEXT UNIQUE,
      address TEXT,
      is_active INTEGER NOT NULL DEFAULT 1,
      deleted INTEGER NOT NULL DEFAULT 0,
      synced_at TEXT DEFAULT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

    await db.execAsync(`
    CREATE TABLE IF NOT EXISTS sales (
      id TEXT PRIMARY KEY,
      quantity INTEGER NOT NULL,
      customer_id UUID NOT NULL,
      sold_by TEXT NOT NULL,
      total_price REAL NOT NULL,
      deposit REAL NOT NULL,
      profit REAL NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      last_edited_by TEXT NOT NULL,
      deleted INTEGER NOT NULL DEFAULT 0,
      synced_at TEXT DEFAULT NULL,
      FOREIGN KEY (sold_by) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE,
      FOREIGN KEY (last_edited_by) REFERENCES users(id) ON DELETE CASCADE
    );
  `);

    await db.execAsync(`
    CREATE TABLE IF NOT EXISTS inventory (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      quantity INTEGER NOT NULL,
      size INTEGER NOT NULL DEFAULT 24,
      unit TEXT NOT NULL DEFAULT pcs,
      cost_price REAL NOT NULL,
      original_selling_price REAL NOT NULL,
      selling_price REAL NOT NULL,
      increment INTEGER NOT NULL DEFAULT 0,
      is_active INTEGER NOT NULL DEFAULT 1, 
      last_edited_by TEXT NOT NULL,
      created_by TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      deleted INTEGER NOT NULL DEFAULT 0,
      synced_at TEXT DEFAULT NULL,
      FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (last_edited_by) REFERENCES users(id) ON DELETE CASCADE
    );
  `);

    await db.execAsync(`
  CREATE TABLE IF NOT EXISTS sellers_inventory (
    id TEXT PRIMARY KEY,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    item_id TEXT NOT NULL,
    seller TEXT NOT NULL,
    quantity_at_hand INTEGER DEFAULT 0,
    deleted INTEGER NOT NULL DEFAULT 0,
    synced_at TEXT DEFAULT NULL,
    FOREIGN KEY (item_id) REFERENCES inventory(id) ON DELETE CASCADE,
    FOREIGN KEY (seller) REFERENCES users(id) ON DELETE CASCADE
  );
`);

    // await db.execAsync(`DROP TABLE IF EXISTS inventory_transfers;`);
    // await db.execAsync(`DROP TABLE IF EXISTS transfer_items;`);

    await db.execAsync(`
  CREATE TABLE IF NOT EXISTS inventory_transfers (
    id TEXT PRIMARY KEY,
    transferred_by TEXT NOT NULL,
    received_by TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted INTEGER NOT NULL DEFAULT 0,
    synced_at TEXT DEFAULT NULL,
    FOREIGN KEY (transferred_by) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (received_by) REFERENCES users(id) ON DELETE CASCADE
  );
`);

    await db.execAsync(`
  CREATE TABLE IF NOT EXISTS returns (
    id TEXT PRIMARY KEY,
    returned_by TEXT NOT NULL,
    seller TEXT NOT NULL,
    item_id TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted INTEGER NOT NULL DEFAULT 0,
    synced_at TEXT DEFAULT NULL,
    FOREIGN KEY (returned_by) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (seller) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (item_id) REFERENCES inventory(id) ON DELETE CASCADE
  );
`);

    await db.execAsync(`
    CREATE TABLE IF NOT EXISTS expenses (
      id TEXT PRIMARY KEY,
      reason TEXT NOT NULL,
      cost REAL NOT NULL,
      created_by TEXT NOT NULL,
      last_edited_by TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      deleted INTEGER NOT NULL DEFAULT 0,
      synced_at TEXT DEFAULT NULL,
      FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (last_edited_by) REFERENCES users(id) ON DELETE CASCADE
    );
  `);

    await db.execAsync(`
    CREATE TABLE IF NOT EXISTS sold_items (
      id TEXT PRIMARY KEY,
      sales_id TEXT NOT NULL,
      item_id TEXT NOT NULL,
      quantity INTEGER NOT NULL,
      total_price REAL NOT NULL,
      last_edited_by TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      deleted INTEGER NOT NULL DEFAULT 0,
      synced_at TEXT DEFAULT NULL,
      FOREIGN KEY (sales_id) REFERENCES sales(id) ON DELETE CASCADE,
      FOREIGN KEY (item_id) REFERENCES inventory(id) ON DELETE CASCADE,
      FOREIGN KEY (last_edited_by) REFERENCES users(id) ON DELETE CASCADE
    );
  `);

    await db.execAsync(`
    CREATE TABLE IF NOT EXISTS transfer_items (
      id TEXT PRIMARY KEY,
      inventory_id TEXT NOT NULL,
      transfer_id TEXT NOT NULL,
      quantity_moved INTEGER NOT NULL,
      last_edited_by TEXT NOT NULL,
      deleted INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      synced_at TEXT DEFAULT NULL,
      FOREIGN KEY (inventory_id) REFERENCES inventory(id) ON DELETE CASCADE,
      FOREIGN KEY (transfer_id) REFERENCES inventory_transfers(id) ON DELETE CASCADE
    );
  `);

    await db.execAsync(`
    CREATE TABLE IF NOT EXISTS purchases (
    id TEXT PRIMARY KEY,
    purchased_by TEXT,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
    deleted INTEGER NOT NULL DEFAULT 0,
    synced_at TEXT DEFAULT NULL,
    FOREIGN KEY (purchased_by) REFERENCES users(id) ON DELETE CASCADE
  );
  `);

    await db.execAsync(`
    CREATE TABLE IF NOT EXISTS purchased_items (
      id TEXT PRIMARY KEY,
      inventory_id TEXT,
      purchase_id TEXT,
      quantity INTEGER DEFAULT 0,
      last_edited_by TEXT,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      deleted INTEGER NOT NULL DEFAULT 0,
      synced_at TEXT DEFAULT NULL,
      FOREIGN KEY (inventory_id) REFERENCES inventory(id) ON DELETE CASCADE,
      FOREIGN KEY (purchase_id) REFERENCES purchases(id) ON DELETE CASCADE,
      FOREIGN KEY (last_edited_by) REFERENCES users(id) ON DELETE CASCADE
    );
  `);

    await db.execAsync(`
     CREATE TABLE IF NOT EXISTS last_pulled (
          table_name TEXT PRIMARY KEY,
          last_pulled_at TEXT DEFAULT NULL
        );
  `);

    console.log("Tables created successfully");
  } catch (error: any) {
    console.error("Error creating table:", error);
    showToast(
      "error",
      "Error creating and storing tables",
      `Error details: ${error.message}`,
    );
  }
};
