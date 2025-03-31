import { eventBus } from "@/events/events";
import { Item } from "@/types/purchases.type";
import { showToast } from "@/utils/notification";
import uuid from "react-native-uuid";
import { getDb } from "./database";

export const addPurchase = async (
  purchased_by: string,
  selectedItems: Item[],
) => {
  try {
    const db = await getDb();
    const id = uuid.v4() as string;
    const now = new Date().toISOString();

    await db.runAsync(
      "INSERT INTO purchases (id, purchased_by, created_at, updated_at) VALUES (?, ?, ?, ?)",
      [id, purchased_by, now, now],
    );

    await Promise.all(
      selectedItems
        .filter((item) => item.quantity > 0)
        .map((item) =>
          addPurchaseItem(item.id, id, item.quantity, purchased_by),
        ),
    );

    return id;
  } catch (error: any) {
    showToast("error", "Something went wrong", `Error: ${error.message}`);
    throw error;
  } finally {
    eventBus.emit(`refresh:all`);
  }
};

export const addPurchaseItem = async (
  inventory_id: string,
  purchase_id: string,
  quantity: number,
  last_edited_by: string,
) => {
  try {
    const db = await getDb();
    const id = uuid.v4() as string;

    // Insert purchase item
    await db.runAsync(
      "INSERT INTO purchased_items (id, inventory_id, purchase_id, quantity, last_edited_by) VALUES (?, ?, ?, ?, ?)",
      [id, inventory_id, purchase_id, quantity, last_edited_by],
    );

    // Fetch and Update inventory item quantity
    const inventoryItem: Inventory | null = await db.getFirstAsync(
      "UPDATE inventory SET quantity = quantity + ?, synced_at = NULL WHERE id = ? RETURNING *",
      [quantity, inventory_id],
    );

    if (!inventoryItem) throw new Error("Inventory item not found");

    // Add to expenses
    const name = inventoryItem.name;
    const expenseId = uuid.v4() as string;
    const reason = `Purchase ${name.slice(0, 12)} x${quantity}`;
    const cost = Number(inventoryItem.cost_price ?? 0) * Number(quantity);

    await db.runAsync(
      "INSERT INTO expenses (id, reason, cost, created_by, last_edited_by) VALUES (?, ?, ?, ?, ?)",
      [expenseId, reason, cost, last_edited_by, last_edited_by],
    );

    return id;
  } catch (error: any) {
    showToast(
      "error",
      "Error adding purchase item",
      `Error details: ${error.message}`,
    );
    throw error;
  } finally {
    eventBus.emit(`refresh:all`);
  }
};

export const getSpecificPurchaseItems = async (
  id: string,
): Promise<PurchasedItem[]> => {
  try {
    const db = await getDb();
    return await db.getAllAsync(
      "SELECT * FROM purchased_items WHERE purchase_id = ? ",
      [id],
    );
  } catch (error: any) {
    showToast(
      "error",
      "Error fetching transfer items",
      `Error details: ${error.message}`,
    );
    throw error;
  }
};
