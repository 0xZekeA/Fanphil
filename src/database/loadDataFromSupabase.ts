import { supabase } from "$root/lib/supabase";
import { showToast } from "@/utils/notification";
import { getDb } from "./database";

export const downloadDataFromSupabase = async () => {
  console.log("Downloading all data from Supabase on sign in...");
  const db = await getDb();
  const now = new Date();

  // List of all tables to download
  const tables = [
    "users",
    "customers",
    "sales",
    "inventory",
    "sellers_inventory",
    "inventory_transfers",
    "returns",
    "expenses",
    "sold_items",
    "transfer_items",
    "purchases",
    "purchased_items",
  ];

  try {
    // Begin transaction
    await db.execAsync("BEGIN TRANSACTION");

    for (const tableName of tables) {
      console.log(`Downloading ${tableName} data...`);

      // Fetch all data from Supabase
      const { data, error } = await supabase.from(tableName).select("*");

      if (error) {
        throw new Error(`Error fetching ${tableName}: ${error.message}`);
      }

      if (!data || data.length === 0) {
        console.log(`No data found for ${tableName}`);
        continue;
      }

      console.log(`Downloaded ${data.length} records for ${tableName}`);

      // Clear existing data in the local table
      await db.execAsync(`DELETE FROM ${tableName}`);

      // Insert each record into local database
      for (const record of data) {
        // Add synced_at prop
        const recordToInsert = { ...record, synced_at: now };

        const columns = Object.keys(recordToInsert).join(", ");
        const placeholders = Object.keys(recordToInsert)
          .map(() => "?")
          .join(", ");
        const values = Object.values(recordToInsert);

        // Convert values array to properly typed array for SQLite
        const safeValues = values.map((value) => {
          if (value === null) return null;
          if (typeof value === "object") return JSON.stringify(value);
          return value;
        });

        const insertStatement = `INSERT OR REPLACE INTO ${tableName} (${columns}) VALUES (${placeholders})`;

        try {
          await db.runAsync(insertStatement, safeValues as any);
        } catch (insertError) {
          console.error(`Error inserting into ${tableName}:`, insertError, {
            statement: insertStatement,
            values: safeValues,
          });
          throw insertError;
        }
      }

      console.log(`Successfully imported ${tableName} data`);
    }

    // Commit transaction
    await db.execAsync("COMMIT");

    console.log("All data downloaded successfully");
    showToast("success", "Data Sync Complete");

    return true;
  } catch (error: any) {
    // Roll back the transaction if any error occurs
    await db.execAsync("ROLLBACK");

    console.error("Error downloading data:", error);
    showToast(
      "error",
      "Sync Failed",
      `Could not download data: ${error.message}`,
    );

    return false;
  }
};
