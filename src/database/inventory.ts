import uuid from "react-native-uuid";
import { getDb } from "./database";

export const addInventory = async (
  name: string,
  quantity: number,
  cost_price: number,
  original_selling_price: number,
  selling_price: number,
  increment: number,
  last_edited_by: string,
  created_by: string,
) => {
  const db = await getDb();
  const id = uuid.v4() as string;
  const now = new Date().toISOString();

  await db.runAsync(
    `INSERT INTO inventory 
    (id, name, quantity, cost_price, original_selling_price, selling_price, increment, last_edited_by, created_by, created_at, updated_at) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      name,
      quantity,
      cost_price,
      original_selling_price,
      selling_price,
      increment,
      last_edited_by,
      created_by,
      now,
      now,
    ],
  );

  return id;
};

export const updateInventory = async (
  id: string,
  name: string,
  quantity: number,
  cost_price: number,
  original_selling_price: number,
  selling_price: number,
  increment: number,
  last_edited_by: string,
) => {
  const db = await getDb();
  const now = new Date().toISOString();

  await db.runAsync(
    `UPDATE inventory 
    SET name = ?, quantity = ?, cost_price = ?, original_selling_price = ?, selling_price = ?, increment = ?, last_edited_by = ?, updated_at = ?, synced_at = NULL
    WHERE id = ?`,
    [
      name,
      quantity,
      cost_price,
      original_selling_price,
      selling_price,
      increment,
      last_edited_by,
      now,
      id,
    ],
  );

  return id;
};

export const getInventory = async (): Promise<Inventory[]> => {
  const db = await getDb();
  return await db.getAllAsync(
    "SELECT * FROM inventory WHERE deleted = 0 ORDER BY created_at DESC",
  );
};

export const deleteInventory = async (id: string) => {
  const db = await getDb();

  await db.runAsync(
    "UPDATE inventory SET is_active = 0, synced_at = NULL WHERE id = ?",
    [id],
  );

  return id;
};
