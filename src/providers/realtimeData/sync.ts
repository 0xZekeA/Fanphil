import { supabase } from "$root/lib/supabase";
import { getDb } from "@/database/database";
import { eventBus } from "@/events/events";
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

const DEBUG_MODE = __DEV__; // Log only in dev mode

const log = (...args: any[]) => {
  if (!DEBUG_MODE) return;
  if (typeof console !== "undefined" && console.log) {
    Function.prototype.apply.call(console.log, console, args);
  }
};

// Parse stringified fields
const parseStringifiedFields = (record: any) => {
  const parsed: any = {};
  for (const key in record) {
    const value = record[key];
    if (typeof value === "string") {
      try {
        const maybeParsed = JSON.parse(value);
        parsed[key] = maybeParsed;
      } catch {
        parsed[key] = value;
      }
    } else {
      parsed[key] = value;
    }
  }
  return parsed;
};

// Stringify arraylike fields
const stringifyComplexFields = (record: any) => {
  const result: any = {};
  for (const key in record) {
    const value = record[key];
    result[key] =
      typeof value === "object" && value !== null
        ? JSON.stringify(value)
        : value;
  }
  return result;
};

/**
 * Push local changes to Supabase
 */
const pushLocalChanges = async (db: any) => {
  log("Pushing local changes to Supabase...");

  for (const table of TABLES_TO_SYNC) {
    try {
      const unsyncedRecords: any[] = await db.getAllAsync(
        `SELECT * FROM ${table} WHERE synced_at IS NULL`,
      );

      log(`${table}: ${unsyncedRecords.length} to update`);

      if (unsyncedRecords.length > 0) {
        const cleanRecords = unsyncedRecords.map(({ synced_at, ...rest }) =>
          parseStringifiedFields(rest),
        );

        let successfulChunks = 0;

        // Upload chunk to supabase with retries
        const uploadChunk = async (chunk: any[]) => {
          let attempts = 0;
          while (attempts < 3) {
            const { error } = await supabase.from(table).upsert(chunk);
            if (!error) {
              successfulChunks++;
              return;
            }
            console.error(`Failed to sync chunk after 3 retries`, chunk);
            await new Promise((res) =>
              setTimeout(res, 1000 * Math.pow(2, attempts)),
            );
            attempts++;
          }
        };

        for (let i = 0; i < cleanRecords.length; i += 500) {
          const chunk = cleanRecords.slice(i, i + 500);
          await uploadChunk(chunk);
        }

        log(
          `${successfulChunks} / ${Math.ceil(
            cleanRecords.length / 500,
          )} chunks synced`,
        );

        // Mark as synced in local DB
        const ids = unsyncedRecords.map((record) => record.id);
        const placeholders = ids.map(() => "?").join(",");
        await db.runAsync(
          `UPDATE ${table} SET synced_at = CURRENT_TIMESTAMP WHERE id IN (${placeholders})`,
          ids,
        );
      }
    } catch (err) {
      console.error(`Error processing ${table}:`, err);
    } finally {
      eventBus.emit(`refresh:${table}`);
    }
  }
};

/**
 * Pull remote changes from Supabase
 */
/**
 * Pull remote changes from Supabase
 */
const pullRemoteChanges = async (db: any) => {
  log("Pulling remote changes from Supabase...");

  for (const table of TABLES_TO_SYNC) {
    try {
      // Add table name to last_pulled if it doesn't exist
      await db.runAsync(
        `INSERT OR IGNORE INTO last_pulled (table_name) VALUES (?)`,
        [table],
      );

      // Get the latest sync timestamp for this table
      const result = await db.getFirstAsync(
        `SELECT last_pulled_at FROM last_pulled WHERE table_name = ?`,
        [table],
      );

      const lastPulledAt = result?.last_pulled_at || "2025-01-01T00:00:00Z";

      // Fetch records updated after the last sync
      const { data, error } = await supabase
        .from(table)
        .select("*")
        .gt("updated_at", lastPulledAt);

      if (error) {
        console.error(`Error fetching from ${table}:`, error.message);
        continue;
      }

      if (!data || data.length === 0) {
        log(`No updates for ${table}`);
        continue;
      }

      log(`Received ${data.length} updates for ${table}`);

      // Reorder data from supabase to put latest update on top
      const reorderedData = data.sort(
        (a, b) =>
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
      );

      // Update the last_pulled table with the lastest timestamp
      const lastest = reorderedData[0].updated_at;

      await db.runAsync(
        `UPDATE last_pulled SET last_pulled_at = ? WHERE table_name = ?`,
        [new Date(lastest).toISOString(), table],
      );

      // Update local database with remote changes
      for (const record of data) {
        if (!record.id) continue;

        // Check if this record exists locally and if local version is newer
        const localRecord = await db.getFirstAsync(
          `SELECT updated_at FROM ${table} WHERE id = ?`,
          [record.id],
        );

        // If local record exists and is more recent, skip this update
        if (
          localRecord &&
          new Date(localRecord.updated_at) >= new Date(record.updated_at)
        ) {
          log(`Skipping ${table}:${record.id} - local is newer`);
          continue;
        }

        // Add sync metadata
        const recordToSave = {
          ...stringifyComplexFields(record),
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
        const existsQuery = await db.getFirstAsync(
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
    } finally {
      eventBus.emit(`refresh:${table}`);
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

  // Stop if something else is syncing
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
