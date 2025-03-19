import { supabase } from "$root/lib/supabase";
import { getDb } from "@/database/database";
import { showToast } from "@/utils/notification";
import NetInfo from "@react-native-community/netinfo";

const TABLES_TO_SYNC = [
  "users",
  "customers",
  "inventory",
  "sales",
  "sold_items",
  "sellers_inventory",
  "inventory_transfers",
  "returns",
  "expenses",
  "transfer_items",
  "purchases",
  "purchased_items",
];

const SYNC_CHECK_INTERVAL = 72 * 1000;
const SYNC_FULL_INTERVAL = 240 * 1000;

let isSyncing = false;
let lastFullSync = 0;

const DEBUG_MODE = __DEV__; // Log only in development mode

const log = (...args: any[]) => {
  if (!DEBUG_MODE) return;
  if (typeof console !== "undefined" && console.log) {
    Function.prototype.apply.call(console.log, console, args);
  }
};

/**
 * Push local changes to Supabase
 */
const pushLocalChanges = async (db: any) => {
  log("Pushing local changes to Supabase...");

  for (const table of TABLES_TO_SYNC) {
    try {
      const unsyncedRecords: any[] = await db.getAllAsync(
        `SELECT * FROM ${table} WHERE synced_at IS NULL AND deleted = 0`,
      );

      const deletedRecords: any[] = await db.getAllAsync(
        `SELECT id FROM ${table} WHERE deleted = 1`,
      );

      log(
        `${table}: ${unsyncedRecords.length} to update, ${deletedRecords.length} to delete`,
      );

      if (unsyncedRecords.length > 0) {
        const cleanRecords = unsyncedRecords.map(
          ({ synced_at, deleted, ...rest }) => rest,
        );

        const { error } = await supabase.from(table).upsert(cleanRecords);

        if (error) {
          console.error(`Error upserting ${table}:`, error.message);
          continue;
        }

        // Mark as synced in local DB
        const ids = unsyncedRecords.map((record) => record.id);
        const placeholders = ids.map(() => "?").join(",");
        await db.runAsync(
          `UPDATE ${table} SET synced_at = CURRENT_TIMESTAMP WHERE id IN (${placeholders})`,
          ids,
        );
      }

      // Delete records from Supabase
      if (deletedRecords.length > 0) {
        const ids = deletedRecords.map((record) => record.id);

        const { error } = await supabase.from(table).delete().in("id", ids);

        if (error) {
          console.error(`Error deleting from ${table}:`, error.message);
          continue;
        }

        // Remove deleted records locally
        const placeholders = ids.map(() => "?").join(",");
        await db.runAsync(
          `DELETE FROM ${table} WHERE id IN (${placeholders})`,
          ids,
        );
      }
    } catch (err) {
      console.error(`Error processing ${table}:`, err);
    }
  }
};

/**
 * Pull remote changes from Supabase
 */
const pullRemoteChanges = async (db: any) => {
  log("Pulling remote changes from Supabase...");

  for (const table of TABLES_TO_SYNC) {
    try {
      // Get the latest sync timestamp for this table
      const result = await db.getAllAsync(
        `SELECT MAX(synced_at) as last_sync FROM ${table} WHERE synced_at IS NOT NULL`,
      );

      const lastSync = result?.last_sync || "1970-01-01T00:00:00Z";

      // Fetch records updated after the last sync
      const { data, error } = await supabase
        .from(table)
        .select("*")
        .gt("updated_at", lastSync);

      if (error) {
        console.error(`Error fetching from ${table}:`, error.message);
        continue;
      }

      if (!data || data.length === 0) {
        log(`No updates for ${table}`);
        continue;
      }

      log(`Received ${data.length} updates for ${table}`);

      // Update local database with remote changes
      for (const record of data) {
        if (!record.id) continue;

        // Check if this record exists locally and if local version is newer
        const localRecord = await db.getAllAsync(
          `SELECT updated_at FROM ${table} WHERE id = ?`,
          [record.id],
        );

        // If local record exists and is more recent, skip this update
        if (
          localRecord &&
          new Date(localRecord.updated_at) > new Date(record.updated_at)
        ) {
          log(`Skipping ${table}:${record.id} - local is newer`);
          continue;
        }

        // Add sync metadata
        const recordToSave = {
          ...record,
          synced_at: new Date().toISOString(),
        };

        // Prep for upsert
        const keys = Object.keys(recordToSave);
        const placeholders = keys.map(() => "?").join(", ");
        const updateParts = keys
          .filter((key) => key !== "id")
          .map((key) => `${key} = ?`);
        const updatePlaceholders = updateParts.join(", ");
        const values = keys.map((key) => recordToSave[key]);
        const updateValues = keys
          .filter((key) => key !== "id")
          .map((key) => recordToSave[key]);

        // Upsert
        const existsQuery = await db.getAllAsync(
          `SELECT id FROM ${table} WHERE id = ?`,
          [record.id],
        );

        if (existsQuery) {
          // Update existing record
          await db.runAsync(
            `UPDATE ${table} SET ${updatePlaceholders} WHERE id = ?`,
            [...updateValues, record.id],
          );
        } else {
          // Insert new record
          await db.runAsync(
            `INSERT INTO ${table} (${keys.join(
              ", ",
            )}) VALUES (${placeholders})`,
            values,
          );
        }
      }
    } catch (err) {
      console.error(`Error processing ${table}:`, err);
    }
  }
};

/**
 * Main sync function
 */

export const syncWithSupabase = async (force = false) => {
  // Check internet
  const networkState = await NetInfo.fetch();
  if (!networkState.isConnected) {
    log("No internet connection, skipping sync");
    return;
  }

  // Stop is something else is syncing
  if (isSyncing) {
    log("Sync already in progress, skipping");
    return;
  }

  try {
    isSyncing = true;
    log("Starting sync process...");

    const now = Date.now();
    const shouldFullSync = force || now - lastFullSync > SYNC_FULL_INTERVAL;

    const db = await getDb();

    // Push local changes to the server
    await pushLocalChanges(db);

    // Pull remote changes
    if (shouldFullSync) {
      await pullRemoteChanges(db);
      lastFullSync = now;
    }

    log("Sync completed successfully");
  } catch (error) {
    console.error("Sync failed:", error);
    showToast(
      "error",
      "Sync Failed",
      "Could not sync with the server. Will try again later.",
    );
  } finally {
    isSyncing = false;
  }
};

/**
 * Initialize sync services
 */
export const initializeSync = () => {
  log("Initializing sync services...");

  setTimeout(() => syncWithSupabase(true), 5000);

  setInterval(syncWithSupabase, SYNC_CHECK_INTERVAL);

  // Setup network change listener
  NetInfo.addEventListener((state) => {
    if (state.isConnected) {
      log("Network connected, initiating sync");
      syncWithSupabase(true);
    }
  });
};
