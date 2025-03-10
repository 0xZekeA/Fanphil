import uuid from "react-native-uuid";
import { getDb } from "./database";

export const addInventoryTransfer = async (
  transferred_by: string,
  received_by: string,
) => {
  const db = await getDb();
  const id = uuid.v4() as string;
  const now = new Date().toISOString();

  await db.runAsync(
    "INSERT INTO inventory_transfers (id, transferred_by, received_by, created_at) VALUES (?, ?, ?, ?)",
    [id, transferred_by, received_by, now],
  );

  return id;
};

export const getInventoryTransfers = async (): Promise<InventoryTransfer[]> => {
  const db = await getDb();
  return await db.getAllAsync(
    "SELECT * FROM inventory_transfers WHERE deleted = 0 ORDER BY created_at DESC",
  );
};

export const deleteInventoryTransfer = async (id: string) => {
  const db = await getDb();

  const transferItems: TransferItem[] = await db.getAllAsync(
    "SELECT * FROM transfer_items WHERE transfer_id = ? AND deleted = 0",
    [id],
  );

  for (const item of transferItems) {
    const { inventory_id, quantity_moved } = item;

    await db.runAsync(
      "UPDATE inventory SET quantity = quantity + ?, synced_at = NULL WHERE id = ?",
      [quantity_moved, inventory_id],
    );

    const transfer: any = await db.getFirstAsync(
      "SELECT received_by FROM inventory_transfers WHERE id = ?",
      [id],
    );

    if (transfer?.received_by) {
      const sellerId = transfer.received_by;

      await db.runAsync(
        "UPDATE sellers_inventory SET quantity = quantity - ?, synced_at = NULL WHERE item_id = ? AND seller = ?",
        [quantity_moved, inventory_id, sellerId],
      );
    }
  }

  await db.runAsync(
    "UPDATE inventory_transfers SET deleted = 1, synced_at = NULL WHERE id = ?",
    [id],
  );
  await db.runAsync(
    "UPDATE transfer_items SET deleted = 1, synced_at = NULL WHERE transfer_id = ?",
    [id],
  );

  return id;
};
