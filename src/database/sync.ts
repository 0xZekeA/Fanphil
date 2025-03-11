import { supabase } from "$root/lib/supabase";
import NetInfo from "@react-native-community/netinfo";
import { getDb } from "./database";

interface Id {
  id: string;
}

const syncTable = async (tableName: string, data: any[], db: any) => {
  if (data.length === 0) return;

  const cleanData = data.map(({ synced_at, deleted, ...rest }) => rest);
  const { error } = await supabase.from(tableName).upsert(cleanData);

  if (error) {
    console.error(`Sync failed for ${tableName}:`, error.message);
    return;
  }

  await db.runAsync(
    `UPDATE ${tableName} SET synced_at = CURRENT_TIMESTAMP WHERE synced_at IS NULL`,
  );
};

const deleteTableRecords = async (
  tableName: string,
  deletedRecords: Id[],
  db: any,
) => {
  if (deletedRecords.length === 0) return;

  const { error } = await supabase
    .from(tableName)
    .delete()
    .in(
      "id",
      deletedRecords.map((s) => s.id),
    );

  if (error) {
    console.error(`Delete failed for ${tableName}:`, error.message);
    return;
  }

  await db.runAsync(`DELETE FROM ${tableName} WHERE deleted = 1`);
};

export const syncWithSupabase = async () => {
  const isConnected = (await NetInfo.fetch()).isConnected;
  if (!isConnected) return;

  const db = await getDb();

  const tables = [
    "sales",
    "expenses",
    "customers",
    "inventory",
    "inventory_transfers",
    "sellers_inventory",
    "sold_items",
    "transfer_items",
  ];

  const syncDataResults = await Promise.all(
    tables.map((table) =>
      db.getAllAsync(
        `SELECT * FROM ${table} WHERE synced_at IS NULL AND deleted = 0`,
      ),
    ),
  );
  const syncDataMap = Object.fromEntries(
    tables.map((table, i) => [table, syncDataResults[i]]),
  );

  const deleteDataResults = await Promise.all(
    tables.map(
      (table) =>
        db.getAllAsync(`SELECT id FROM ${table} WHERE deleted = 1`) as Promise<
          Id[]
        >,
    ),
  );
  const deleteDataMap = Object.fromEntries(
    tables.map((table, i) => [table, deleteDataResults[i]]),
  );

  await Promise.all(
    tables.map((table) => syncTable(table, syncDataMap[table], db)),
  );

  await Promise.all(
    tables.map((table) => deleteTableRecords(table, deleteDataMap[table], db)),
  );
};
