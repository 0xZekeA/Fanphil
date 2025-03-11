import { showToast } from "@/utils/notification";
import uuid from "react-native-uuid";
import { getDb } from "./database";

export const addSale = async (
  quantity: number,
  sold_by: string,
  customer: string,
  total_price: number,
  deposit: number,
) => {
  try {
    const db = await getDb();
    const id = uuid.v4() as string;
    const now = new Date().toISOString();

    await db.runAsync(
      "INSERT INTO sales (id, quantity, sold_by, customer_id, total_price, deposit, created_at, updated_at, last_edited_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        id,
        quantity,
        sold_by,
        customer,
        total_price,
        deposit,
        now,
        now,
        sold_by,
      ],
    );

    return id;
  } catch (error: any) {
    showToast("error", "Failed to add sale", `Error details: ${error.message}`);
    throw error;
  }
};

export const updateSale = async (
  quantity: number,
  sold_by: string,
  total_price: number,
  deposit: number,
  id: string,
  user_id: string,
) => {
  try {
    const db = await getDb();
    const now = new Date().toISOString();

    await db.runAsync(
      "UPDATE sales SET quantity = ?, sold_by = ?, total_price = ?, deposit = ?, updated_at = ?, last_edited_by = ?, synced_at = NULL WHERE id = ?",
      [quantity, sold_by, total_price, deposit, now, user_id, id],
    );

    return id;
  } catch (error: any) {
    showToast(
      "error",
      "Failed to update sale",
      `Error details: ${error.message}`,
    );
    throw error;
  }
};

export const getSales = async (): Promise<Sale[]> => {
  try {
    const db = await getDb();
    return await db.getAllAsync("SELECT * FROM sales ORDER BY created_at DESC");
  } catch (error: any) {
    showToast(
      "error",
      "Failed to fetch sales",
      `Error details: ${error.message}`,
    );
    throw error;
  }
};

export const deleteSale = async (id: string) => {
  try {
    const db = await getDb();

    await db.runAsync(
      "UPDATE sales SET deleted = 1, synced_at = NULL WHERE id = ?",
      [id],
    );

    const soldItems: SoldItem[] = await db.getAllAsync(
      "SELECT * FROM sold_items WHERE sales_id = ? AND deleted = 0",
      [id],
    );

    const soldBy: any = await db.getFirstAsync(
      "SELECT sold_by FROM sales WHERE id = ?",
      [id],
    );

    if (!soldBy) return;

    for (const item of soldItems) {
      await db.runAsync(
        "UPDATE sellers_inventory SET quantity = quantity + ? WHERE item_id = ? AND seller = ?",
        [item.quantity, item.item_id, soldBy.sold_by],
      );
    }

    await db.runAsync(
      "UPDATE sold_items SET deleted = 1, synced_at = NULL WHERE sales_id = ?",
      [id],
    );

    return id;
  } catch (error: any) {
    showToast(
      "error",
      "Failed to delete this sale",
      `Error details: ${error.message}`,
    );
    throw error;
  }
};
