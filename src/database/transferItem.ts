import { showToast } from "@/utils/notification";
import uuid from "react-native-uuid";
import { supastash } from "supastash";

export async function addTransferItem(
  inventory_id: string,
  transfer_id: string,
  quantity_moved: number,
  last_edited_by: string,
) {
  try {
    const id = uuid.v4().toString();

    await supastash
      .from("transfer_items")
      .insert({
        id,
        inventory_id,
        transfer_id,
        quantity_moved,
        last_edited_by,
      })
      .run();

    const { data: inventoryItem }: { data: Inventory | null } = await supastash
      .from("inventory")
      .select("*")
      .eq("id", inventory_id)
      .single()
      .run();

    if (!inventoryItem) throw new Error("Inventory item not found");

    if (quantity_moved > inventoryItem.quantity) {
      throw new Error(
        `Not enough stock! Trying to move ${quantity_moved}, but only ${inventoryItem.quantity} available.`,
      );
    }

    const newInventoryQuantity = inventoryItem.quantity - quantity_moved;

    await supastash
      .from("inventory")
      .update({
        quantity: newInventoryQuantity,
      })
      .eq("id", inventory_id)
      .run();

    const { data: transfer }: { data: InventoryTransfer | null } =
      await supastash
        .from("inventory_transfers")
        .select("*")
        .eq("id", transfer_id)
        .single()
        .run();

    const sellerId = transfer?.received_by;
    if (!sellerId)
      throw new Error("Transfer record not found or missing seller");

    const { data: sellerInventoryItem }: { data: SellersInventory | null } =
      await supastash
        .from("sellers_inventory")
        .select("*")
        .eq("item_id", inventory_id)
        .eq("seller", sellerId)
        .single()
        .run();

    if (sellerInventoryItem) {
      const newSellerQuantity =
        sellerInventoryItem.quantity_at_hand + quantity_moved;

      await supastash
        .from("sellers_inventory")
        .update({
          quantity_at_hand: newSellerQuantity,
        })
        .eq("item_id", inventory_id)
        .eq("seller", sellerId)
        .run();
    } else {
      await supastash
        .from("sellers_inventory")
        .insert({
          id: uuid.v4().toString(),
          item_id: inventory_id,
          seller: sellerId,
          quantity_at_hand: quantity_moved,
        })
        .run();
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
}

export async function updateTransferItem(
  id: string,
  new_quantity_moved: number,
) {
  try {
    const { data: existingItem }: { data: TransferItem | null } =
      await supastash
        .from("transfer_items")
        .select("*")
        .eq("id", id)
        .single()
        .run();

    if (!existingItem) throw new Error("Transfer item not found");

    const {
      inventory_id,
      transfer_id,
      quantity_moved: old_quantity_moved,
    } = existingItem;

    const quantity_difference = new_quantity_moved - old_quantity_moved;

    await supastash
      .from("transfer_items")
      .update({
        quantity_moved: new_quantity_moved,
      })
      .eq("id", id)
      .run();

    const { data: inventoryItem }: { data: Inventory | null } = await supastash
      .from("inventory")
      .select("*")
      .eq("id", inventory_id)
      .single()
      .run();

    if (!inventoryItem) throw new Error("Inventory item not found");

    const newInventoryQuantity = inventoryItem.quantity - quantity_difference;

    await supastash
      .from("inventory")
      .update({
        quantity: newInventoryQuantity,
      })
      .eq("id", inventory_id)
      .run();

    const { data: transfer }: { data: InventoryTransfer | null } =
      await supastash
        .from("inventory_transfers")
        .select("*")
        .eq("id", transfer_id)
        .single()
        .run();

    const sellerId = transfer?.received_by;
    if (!sellerId)
      throw new Error("Transfer record not found or missing seller");

    const { data: sellerInventoryItem }: { data: SellersInventory | null } =
      await supastash
        .from("sellers_inventory")
        .select("*")
        .eq("item_id", inventory_id)
        .eq("seller", sellerId)
        .single()
        .run();

    if (sellerInventoryItem) {
      const newSellerQuantity =
        sellerInventoryItem.quantity_at_hand + quantity_difference;

      await supastash
        .from("sellers_inventory")
        .update({
          quantity_at_hand: newSellerQuantity,
        })
        .eq("item_id", inventory_id)
        .eq("seller", sellerId)
        .run();
    } else if (quantity_difference > 0) {
      await supastash
        .from("sellers_inventory")
        .insert({
          id: uuid.v4().toString(),
          item_id: inventory_id,
          seller: sellerId,
          quantity_at_hand: new_quantity_moved,
        })
        .run();
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
}

export async function getTransferItems(): Promise<TransferItem[] | null> {
  try {
    const { data: transferItems }: { data: TransferItem[] | null } =
      await supastash.from("transfer_items").select("*").run();

    return transferItems;
  } catch (error: any) {
    showToast(
      "error",
      "Error fetching transfer items",
      `Error details: ${error.message}`,
    );
    throw error;
  }
}

export const deleteTransferItem = async (id: string) => {
  try {
    const { data: item }: { data: TransferItem | null } = await supastash
      .from("transfer_items")
      .select("*")
      .eq("id", id)
      .single()
      .run();

    if (!item) return;

    await supastash.from("transfer_items").delete().eq("id", id).run();

    const {
      inventory_id: inventoryId,
      transfer_id: transferId,
      quantity_moved: itemQuantity = 0,
    } = item;

    if (!inventoryId) return;

    const { data: itemInInventory }: { data: Inventory | null } =
      await supastash
        .from("inventory")
        .select("*")
        .eq("id", inventoryId)
        .is("deleted_at", null)
        .single()
        .run();

    const { data: transfer }: { data: InventoryTransfer | null } =
      await supastash
        .from("inventory_transfers")
        .select("*")
        .eq("id", transferId)
        .single()
        .run();

    if (!itemInInventory) return;

    const itemQuantityInInventory = itemInInventory.quantity || 0;
    const newQuantity = itemQuantity + itemQuantityInInventory;

    await supastash
      .from("inventory")
      .update({
        quantity: newQuantity,
      })
      .eq("id", inventoryId)
      .run();

    const sellerId = transfer?.received_by;
    if (!sellerId) return;

    const { data: itemInSellersInventory }: { data: SellersInventory | null } =
      await supastash
        .from("sellers_inventory")
        .select("*")
        .eq("item_id", inventoryId)
        .eq("seller", sellerId)
        .is("deleted_at", null)
        .single()
        .run();

    const sellersInventoryItemQuantity =
      itemInSellersInventory?.quantity_at_hand || 0;
    const newSellersInventoryItemQuantity =
      sellersInventoryItemQuantity - itemQuantity;

    await supastash
      .from("sellers_inventory")
      .update({
        quantity_at_hand: newSellersInventoryItemQuantity,
      })
      .eq("item_id", inventoryId)
      .eq("seller", sellerId)
      .run();
  } catch (error: any) {
    showToast(
      "error",
      "Error deleting transfer item",
      `Error details: ${error.message}`,
    );
    throw error;
  }
};

export const getSpecificTransferItems = async (
  id: string,
): Promise<TransferItem[] | null> => {
  try {
    const { data: transferItems }: { data: TransferItem[] | null } =
      await supastash
        .from("transfer_items")
        .select("*")
        .eq("transfer_id", id)
        .run();

    return transferItems;
  } catch (error: any) {
    showToast(
      "error",
      "Error fetching transfer items",
      `Error details: ${error.message}`,
    );
    throw error;
  }
};
