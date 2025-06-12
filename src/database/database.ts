import { getSupastashDb, SupastashSQLiteDatabase } from "supastash";

let db: SupastashSQLiteDatabase | null = null;

export const getDb = async () => {
  if (!db) {
    db = await getSupastashDb();
  }
  return db;
};
