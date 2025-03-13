import { capitalizeItem } from "@/utils/capitalize";
import { showToast } from "@/utils/notification";
import uuid from "react-native-uuid";
import { getDb } from "./database";

export const addInventory = async (
  name: string,
  quantity: string,
  cost_price: string,
  original_selling_price: string,
  selling_price: string,
  increment: number,
  size: string,
  unit: string,
  last_edited_by: string,
  created_by: string,
) => {
  try {
    const db = await getDb();
    const id = uuid.v4() as string;
    const now = new Date().toISOString();

    await db.runAsync(
      `INSERT INTO inventory 
      (id, name, quantity, cost_price, original_selling_price, selling_price, increment, size, unit, last_edited_by, created_by, created_at, updated_at) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        capitalizeItem(name),
        Number(quantity),
        Number(cost_price),
        Number(original_selling_price),
        Number(selling_price),
        Number(increment),
        Number(size),
        unit.toLowerCase(),
        last_edited_by,
        created_by,
        now,
        now,
      ],
    );

    return id;
  } catch (error: any) {
    showToast(
      "error",
      "Failed to add inventory item",
      `Error details: ${error.message}`,
    );
    throw error;
  }
};

export const updateInventory = async (
  id: string,
  name: string,
  quantity: number,
  cost_price: number,
  original_selling_price: number,
  selling_price: number,
  increment: number,
  size: number,
  unit: string,
  last_edited_by: string,
) => {
  try {
    const db = await getDb();
    const now = new Date().toISOString();

    await db.runAsync(
      `UPDATE inventory 
      SET name = ?, quantity = ?, cost_price = ?, original_selling_price = ?, selling_price = ?, increment = ?, size = ?, unit = ?, last_edited_by = ?, updated_at = ?, synced_at = NULL
      WHERE id = ?`,
      [
        capitalizeItem(name),
        Number(quantity),
        Number(cost_price),
        Number(original_selling_price),
        Number(selling_price),
        Number(increment),
        Number(size),
        unit.toLowerCase(),
        last_edited_by,
        now,
        id,
      ],
    );

    return id;
  } catch (error: any) {
    showToast(
      "error",
      "Failed to update inventory",
      `Error details: ${error.message}`,
    );
    throw error;
  }
};

export const getInventory = async (): Promise<Inventory[]> => {
  try {
    const db = await getDb();
    return await db.getAllAsync(
      "SELECT * FROM inventory WHERE deleted = 0 ORDER BY created_at DESC",
    );
  } catch (error: any) {
    showToast(
      "error",
      "Failed to fetch inventory",
      `Error details: ${error.message}`,
    );
    throw error;
  }
};

export const deleteInventoryItem = async (id: string) => {
  try {
    const db = await getDb();

    await db.runAsync(
      "UPDATE inventory SET is_active = 0, synced_at = NULL WHERE id = ?",
      [id],
    );

    return id;
  } catch (error: any) {
    showToast(
      "error",
      "Failed to delete inventory",
      `Error details: ${error.message}`,
    );
    throw error;
  }
};

export const reactivateInventoryItem = async (id: string) => {
  try {
    const db = await getDb();

    await db.runAsync(
      "UPDATE inventory SET is_active = 1, synced_at = NULL WHERE id = ?",
      [id],
    );

    return id;
  } catch (error: any) {
    showToast(
      "error",
      "Failed to delete inventory",
      `Error details: ${error.message}`,
    );
    throw error;
  }
};
