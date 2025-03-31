import { showToast } from "@/utils/notification";
import { getDb } from "./database";

export const wipeTablesOnSignOut = async () => {
  console.log("Wiping database tables on sign out...");
  const db = await getDb();

  try {
    // Tables list
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

    // Begin transaction
    await db.execAsync("BEGIN TRANSACTION");

    // Delete all data from each table
    for (const table of tables) {
      await db.execAsync(`DELETE FROM ${table}`);
      console.log(`Wiped table: ${table}`);
    }

    // Commit the transaction
    await db.execAsync("COMMIT");

    console.log("All tables wiped successfully");
    showToast(
      "success",
      "Sign Out Complete",
      "All local data has been cleared successfully.",
    );
  } catch (error: any) {
    // Roll back the transaction if any error occurs
    await db.execAsync("ROLLBACK");

    console.error("Error wiping tables:", error);
    showToast(
      "error",
      "Error Clearing Data",
      `Could not clear local data: ${error.message}`,
    );

    throw error;
  }
};
