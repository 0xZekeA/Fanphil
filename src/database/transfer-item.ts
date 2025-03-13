import { showToast } from "@/utils/notification";
import uuid from "react-native-uuid";
import { getDb } from "./database";

export const addTransferItem = async (
  inventory_id: string,
  transfer_id: string,
  quantity_moved: number,
  last_edited_by: string,
) => {
  try {
    const db = await getDb();
    const id = uuid.v4() as string;

    await db.runAsync(
      "INSERT INTO transfer_items (id, inventory_id, transfer_id, quantity_moved, last_edited_by) VALUES (?, ?, ?, ?, ?)",
      [id, inventory_id, transfer_id, quantity_moved, last_edited_by],
    );

    const inventoryItem: Inventory | null = await db.getFirstAsync(
      "SELECT * FROM inventory WHERE id = ?",
      [inventory_id],
    );

    if (!inventoryItem) throw new Error("Inventory item not found");

    if (quantity_moved > inventoryItem.quantity) {
      throw new Error(
        `Not enough stock! Trying to move ${quantity_moved}, but only ${inventoryItem.quantity} available.`,
      );
    }

    const newInventoryQuantity = inventoryItem.quantity - quantity_moved;

    await db.runAsync(
      "UPDATE inventory SET quantity = ?, synced_at = NULL WHERE id = ?",
      [newInventoryQuantity, inventory_id],
    );

    const transfer: InventoryTransfer | null = await db.getFirstAsync(
      "SELECT * FROM inventory_transfers WHERE id = ?",
      [transfer_id],
    );

    const sellerId = transfer?.received_by;
    if (!sellerId)
      throw new Error("Transfer record not found or missing seller");

    const sellerInventoryItem: SellersInventory | null = await db.getFirstAsync(
      "SELECT * FROM sellers_inventory WHERE item_id = ? AND seller = ?",
      [inventory_id, sellerId],
    );

    if (sellerInventoryItem) {
      const newSellerQuantity =
        sellerInventoryItem.quantity_at_hand + quantity_moved;
      await db.runAsync(
        "UPDATE sellers_inventory SET quantity_at_hand = ?, synced_at = NULL WHERE item_id = ? AND seller = ?",
        [newSellerQuantity, inventory_id, sellerId],
      );
    } else {
      await db.runAsync(
        "INSERT INTO sellers_inventory (id, item_id, seller, quantity_at_hand) VALUES (?, ?, ?, ?)",
        [uuid.v4(), inventory_id, sellerId, quantity_moved],
      );
    }

    return id;
  } catch (error: any) {
    showToast(
      "error",
      "Error adding transfer item",
      `Error details: ${error.message}`,
    );
    throw error;
  }
};

export const updateTransferItem = async (
  id: string,
  new_quantity_moved: number,
) => {
  try {
    const db = await getDb();

    const existingItem: TransferItem | null = await db.getFirstAsync(
      "SELECT * FROM transfer_items WHERE id = ?",
      [id],
    );

    if (!existingItem) throw new Error("Transfer item not found");

    const {
      inventory_id,
      transfer_id,
      quantity_moved: old_quantity_moved,
    } = existingItem;

    const quantity_difference = new_quantity_moved - old_quantity_moved;

    await db.runAsync(
      "UPDATE transfer_items SET quantity_moved = ?, synced_at = NULL WHERE id = ?",
      [new_quantity_moved, id],
    );

    const inventoryItem: Inventory | null = await db.getFirstAsync(
      "SELECT * FROM inventory WHERE id = ?",
      [inventory_id],
    );

    if (!inventoryItem) throw new Error("Inventory item not found");

    const newInventoryQuantity = inventoryItem.quantity - quantity_difference;

    await db.runAsync(
      "UPDATE inventory SET quantity = ?, synced_at = NULL WHERE id = ?",
      [newInventoryQuantity, inventory_id],
    );

    const transfer: InventoryTransfer | null = await db.getFirstAsync(
      "SELECT * FROM inventory_transfers WHERE id = ?",
      [transfer_id],
    );

    const sellerId = transfer?.received_by;
    if (!sellerId)
      throw new Error("Transfer record not found or missing seller");

    const sellerInventoryItem: SellersInventory | null = await db.getFirstAsync(
      "SELECT * FROM sellers_inventory WHERE item_id = ? AND seller = ?",
      [inventory_id, sellerId],
    );

    if (sellerInventoryItem) {
      const newSellerQuantity =
        sellerInventoryItem.quantity_at_hand + quantity_difference;
      await db.runAsync(
        "UPDATE sellers_inventory SET quantity = ?, synced_at = NULL WHERE item_id = ? AND seller = ?",
        [newSellerQuantity, inventory_id, sellerId],
      );
    } else if (quantity_difference > 0) {
      await db.runAsync(
        "INSERT INTO sellers_inventory (id, item_id, seller, quantity) VALUES (?, ?, ?, ?)",
        [uuid.v4(), inventory_id, sellerId, new_quantity_moved],
      );
    }

    return id;
  } catch (error: any) {
    showToast(
      "error",
      "Error updating transfer item",
      `Error details: ${error.message}`,
    );
    throw error;
  }
};

export const getTransferItems = async (): Promise<TransferItem[]> => {
  try {
    const db = await getDb();
    return await db.getAllAsync("SELECT * FROM transfer_items");
  } catch (error: any) {
    showToast(
      "error",
      "Error fetching transfer items",
      `Error details: ${error.message}`,
    );
    throw error;
  }
};

export const deleteTransferItem = async (id: string) => {
  try {
    const db = await getDb();

    await db.runAsync(
      "UPDATE transfer_items SET deleted = 1, synced_at = 0 WHERE id = ?",
      [id],
    );

    const item: TransferItem | null = await db.getFirstAsync(
      "SELECT * FROM transfer_items WHERE id = ?",
      [id],
    );

    if (!item) return;

    const {
      inventory_id: inventoryId,
      transfer_id: transferId,
      quantity_moved: itemQuantity = 0,
    } = item;

    if (!inventoryId) return;

    const itemInInventory: Inventory | null = await db.getFirstAsync(
      "SELECT * FROM inventory WHERE id = ? AND deleted = 0",
      [inventoryId],
    );

    const transfer: InventoryTransfer | null = await db.getFirstAsync(
      "SELECT * FROM inventory_transfers WHERE id = ?",
      [transferId],
    );

    if (!itemInInventory) return;

    const itemQuantityInInventory = itemInInventory.quantity || 0;
    const newQuantity = itemQuantity + itemQuantityInInventory;

    await db.runAsync(
      "UPDATE inventory SET quantity = ?, synced_at = NULL WHERE id = ?",
      [newQuantity, inventoryId],
    );

    const sellerId = transfer?.received_by;
    if (!sellerId) return;

    const itemInSellersInventory: SellersInventory | null =
      await db.getFirstAsync(
        "SELECT * FROM sellers_inventory WHERE item_id = ? AND seller = ? AND deleted = 0",
        [inventoryId, sellerId],
      );

    const sellersInventoryItemQuantity =
      itemInSellersInventory?.quantity_at_hand || 0;
    const newSellersInventoryItemQuantity =
      sellersInventoryItemQuantity - itemQuantity;

    await db.runAsync(
      "UPDATE sellers_inventory SET quantity = ?, synced_at = NULL WHERE item_id = ? AND seller = ?",
      [newSellersInventoryItemQuantity, inventoryId, sellerId],
    );
  } catch (error: any) {
    showToast(
      "error",
      "Error deleting transfer item",
      `Error details: ${error.message}`,
    );
    throw error;
  }
};
