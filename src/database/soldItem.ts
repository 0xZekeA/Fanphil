import { showToast } from "@/utils/notification";
import uuid from "react-native-uuid";
import { getDb } from "./database";

export const addSoldItem = async (
  isAdminOrMgr: boolean,
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

    if (isAdminOrMgr) {
      await db.runAsync(
        "UPDATE inventory SET quantity = quantity - ? WHERE id = ? AND deleted = 0",
        [quantity, item_id],
      );
    } else {
      await db.runAsync(
        "UPDATE sellers_inventory SET quantity_at_hand = quantity_at_hand - ? WHERE item_id = ? AND seller = ? AND deleted = 0",
        [quantity, item_id, sold_by],
      );
    }

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

export const getSalesSoldItems = async (
  sales_id: string,
): Promise<SoldItem[]> => {
  try {
    const db = await getDb();
    return await db.getAllAsync(
      "SELECT * FROM sold_items WHERE sales_id = ? AND deleted = 0",
      [sales_id],
    );
  } catch (error: any) {
    showToast(
      "error",
      "Failed to fetch sold items",
      `Error details: ${error.message}`,
    );
    console.error("Error in getSoldItems:", error);
    throw error;
  }
};

export const fetchSoldItems = async (salesId: string) => {
  try {
    const soldItems = await getSalesSoldItems(salesId);
    return soldItems;
  } catch (error) {
    console.error("Error fetching sold items:", error);
  }
};

export const updateSoldItem = async (
  id: string,
  quantity: number,
  total_price: number,
  user_id: string,
) => {
  try {
    const db = await getDb();
    const now = new Date().toISOString();

    // Get the original sold item
    const originalItem: SoldItem | null = await db.getFirstAsync(
      "SELECT * FROM sold_items WHERE id = ?",
      [id],
    );

    if (!originalItem) {
      throw new Error("Sold item not found");
    }

    const quantityDifference = originalItem.quantity - quantity;

    // Update the sold item
    await db.runAsync(
      "UPDATE sold_items SET quantity = ?, total_price = ?, last_edited_by = ?, updated_at = ?, synced_at = NULL WHERE id = ?",
      [quantity, total_price, user_id, now, id],
    );

    // If quantity was reduced, return the difference
    if (quantityDifference > 0) {
      await db.runAsync(
        "UPDATE inventory SET quantity = quantity + ? WHERE id = ?",
        [quantityDifference, originalItem.item_id],
      );
    }

    return id;
  } catch (error: any) {
    showToast(
      "error",
      "Failed to update sold item",
      `Error details: ${error.message}`,
    );
    console.error("Error in updateSoldItem:", error);
    throw error;
  }
};

export const deleteSoldItem = async (id: string) => {
  try {
    const db = await getDb();

    // Get the sold item details
    const item: SoldItem | null = await db.getFirstAsync(
      "SELECT * FROM sold_items WHERE id = ?",
      [id],
    );

    if (!item) return;

    const salesId = item.sales_id;
    const inventoryId = item.item_id;
    const quantitySold = item.quantity;

    // Mark the sold item as deleted
    await db.runAsync(
      "UPDATE sold_items SET deleted = 1, synced_at = NULL WHERE id = ?",
      [id],
    );

    // Return inventory to main inventory
    await db.runAsync(
      "UPDATE inventory SET quantity = quantity + ? WHERE id = ?",
      [quantitySold, inventoryId],
    );

    // Update the quantity in the sales record
    const distinctItemCount: { item_count: number } | null =
      await db.getFirstAsync(
        "SELECT COUNT(DISTINCT item_id) AS item_count FROM sold_items WHERE sales_id = ? AND deleted = 0",
        [salesId],
      );

    await db.runAsync(
      "UPDATE sales SET quantity = ?, synced_at = NULL WHERE id = ?",
      [distinctItemCount?.item_count || 0, salesId],
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
