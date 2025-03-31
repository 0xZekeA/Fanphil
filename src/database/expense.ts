import { eventBus } from "@/events/events";
import { showToast } from "@/utils/notification";
import uuid from "react-native-uuid";
import { getDb } from "./database";

const TABLE_NAME = "expenses";

export const addExpense = async (
  reason: string,
  cost: number,
  created_by: string,
) => {
  try {
    const db = await getDb();
    const id = uuid.v4() as string;
    const now = new Date().toISOString();

    await db.runAsync(
      "INSERT INTO expenses (id, reason, cost, created_by, last_edited_by, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [id, reason, cost, created_by, created_by, now, now],
    );

    eventBus.emit(`refresh:${TABLE_NAME}`);

    return id;
  } catch (error: any) {
    showToast(
      "error",
      "Error in addExpense:",
      `Error details: ${error.message}`,
    );
    throw error;
  }
};

export const updateExpense = async (
  reason: string,
  cost: number,
  last_edited_by: string,
  id: string,
) => {
  try {
    const db = await getDb();
    const now = new Date().toISOString();

    await db.runAsync(
      `UPDATE expenses 
      SET reason = ?, cost = ?, last_edited_by = ?, updated_at = ?, synced_at = NULL
      WHERE id = ?`,
      [reason, cost, last_edited_by, now, id],
    );

    eventBus.emit(`refresh:${TABLE_NAME}`);

    return id;
  } catch (error: any) {
    showToast(
      "error",
      "Error in updateExpense:",
      `Error details: ${error.message}`,
    );
    throw error;
  }
};

export const getExpenses = async (): Promise<Expense[]> => {
  try {
    const db = await getDb();
    return await db.getAllAsync(
      "SELECT * FROM expenses ORDER BY created_at DESC",
    );
  } catch (error: any) {
    showToast(
      "error",
      "Error in getExpenses:",
      `Error details: ${error.message}`,
    );
    throw error;
  }
};

export const deleteExpense = async (id: string) => {
  try {
    const db = await getDb();
    await db.runAsync(
      "UPDATE expenses SET deleted = 1, synced_at = NULL WHERE id = ?",
      [id],
    );

    eventBus.emit(`refresh:${TABLE_NAME}`);
    return id;
  } catch (error: any) {
    showToast(
      "error",
      "Error in deleteExpense:",
      `Error details: ${error.message}`,
    );
    throw error;
  }
};
