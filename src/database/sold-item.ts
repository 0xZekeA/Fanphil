import { showToast } from "@/utils/notification";
import uuid from "react-native-uuid";
import { getDb } from "./database";

export const addSoldItem = async (
  sales_id: string,
  item_id: string,
  quantity: number,
  total_price: number,
  sold_by: string,
) => {
  try {
    const db = await getDb();
    const id = uuid.v4() as string;
    const now = new Date().toISOString();

    await db.runAsync(
      "INSERT INTO sold_items (id, sales_id, item_id, quantity, total_price, last_edited_by, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [id, sales_id, item_id, quantity, total_price, sold_by, now, now],
    );

    await db.runAsync(
      "UPDATE sellers_inventory SET quantity = quantity - ? WHERE item_id = ? AND seller = ? AND deleted = 0",
      [quantity, item_id, sold_by],
    );

    return id;
  } catch (error: any) {
    showToast(
      "error",
      "Could not add sold item",
      `Error details: ${error.message}`,
    );
    console.error("Error in addSoldItem:", error);
    throw error;
  }
};

export const getSoldItems = async (): Promise<SoldItem[]> => {
  try {
    const db = await getDb();
    return await db.getAllAsync(
      "SELECT * FROM sold_items ORDER BY created_at DESC",
    );
  } catch (error: any) {
    showToast(
      "error",
      "Failed to load sold items",
      `Error details: ${error.message}`,
    );
    console.error("Error in getSoldItems:", error);
    throw error;
  }
};

export const deleteSoldItem = async (id: string) => {
  try {
    const db = await getDb();
    const item: SoldItem | null = await db.getFirstAsync(
      "SELECT * FROM sold_items WHERE id = ?",
      [id],
    );

    if (!item) return;

    const salesId = item.sales_id;

    const soldBy: any = await db.getFirstAsync(
      "SELECT sold_by FROM sales WHERE id = ?",
      [id],
    );

    if (!soldBy) return;

    const inventoryId = item.item_id;
    const quantitySold = item.quantity;
    const sellerId = soldBy.sold_by;

    await db.runAsync(
      "UPDATE sold_items SET deleted = 1, synced_at = NULL WHERE id = ?",
      [id],
    );

    await db.runAsync(
      "UPDATE sellers_inventory SET quantity = quantity + ? WHERE item_id = ? AND seller = ?",
      [quantitySold, inventoryId, sellerId],
    );

    const totalQuantity: number | null = await db.getFirstAsync(
      "SELECT SUM(quantity) AS total_quantity FROM sold_items WHERE sales_id = ? AND deleted = 0",
      [salesId],
    );

    await db.runAsync(
      "UPDATE sales SET quantity = ?, synced_at = NULL WHERE id = ?",
      [totalQuantity || 0, salesId],
    );

    return id;
  } catch (error: any) {
    showToast(
      "error",
      "Could not delete sold item",
      `Error details: ${error.message}`,
    );
    console.error("Error in deleteSoldItem:", error);
    throw error;
  }
};
