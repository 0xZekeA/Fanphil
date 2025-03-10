import uuid from "react-native-uuid";
import { getDb } from "./database";

export const addExpense = async (
  reason: string,
  cost: number,
  created_by: string,
) => {
  const db = await getDb();
  const id = uuid.v4() as string;
  const now = new Date().toISOString();

  await db.runAsync(
    "INSERT INTO expenses (id, reason, cost, created_by, last_edited_by, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [id, reason, cost, created_by, created_by, now, now],
  );

  return id;
};

export const updateExpense = async (
  reason: string,
  cost: number,
  last_edited_by: string,
  id: string,
) => {
  const db = await getDb();
  const now = new Date().toISOString();

  await db.runAsync(
    `UPDATE expenses 
    SET reason = ?, cost = ?, last_edited_by = ?, updated_at = ?, synced_at = NULL
    WHERE id = ?`,
    [reason, cost, last_edited_by, now, id],
  );

  return id;
};

export const getExpenses = async (): Promise<Expense[]> => {
  const db = await getDb();
  return await db.getAllAsync(
    "SELECT * FROM expenses ORDER BY created_at DESC",
  );
};

export const deleteExpense = async (id: string) => {
  const db = await getDb();
  await db.runAsync(
    "UPDATE sales SET deleted = 1, synced_at = NULL WHERE id = ?",
    [id],
  );
  return id;
};
