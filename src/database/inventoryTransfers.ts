import { showToast } from "@/utils/notification";
import uuid from "react-native-uuid";
import { supastash } from "supastash";

const TABLE_NAME = "inventory_transfers";

export async function addInventoryTransfer(
  transferred_by: string,
  received_by: string,
) {
  try {
    const id = uuid.v4().toString();

    await supastash
      .from(TABLE_NAME)
      .insert({
        id,
        transferred_by,
        received_by,
      })
      .run();

    return id;
  } catch (error: any) {
    showToast("error", "Something went wrong", `Error: ${error.message}`);
    throw error;
  }
}

export async function deleteInventoryItemTransfer(id: string) {
  try {
    const { data: transferItems } = await supastash
      .from(TABLE_NAME)
      .select("*")
      .eq("transfer_id", id)
      .is("deleted_at", null)
      .run();

    if (!transferItems) {
      throw new Error("Transfer items not found");
    }

    for (const item of transferItems) {
      const { inventory_id, quantity_moved } = item;

      const { data: inventoryItem } = await supastash
        .from("inventory")
        .select("*")
        .eq("id", inventory_id)
        .single()
        .run();

      await supastash
        .from("inventory")
        .update({
          quantity: (inventoryItem.quantity || 0) + quantity_moved,
        })
        .eq("id", inventory_id)
        .run();

      const { data: transfer } = await supastash
        .from(TABLE_NAME)
        .select("received_by")
        .eq("id", id)
        .single()
        .run();

      if (!transfer) {
        throw new Error("Transfer not found");
      }

      if (transfer?.received_by) {
        const sellerId = transfer.received_by;

        const { data: sellerInventory } = await supastash
          .from("sellers_inventory")
          .select("*")
          .eq("item_id", inventory_id)
          .eq("seller", sellerId)
          .single()
          .run();

        if (sellerInventory) {
          await supastash
            .from("sellers_inventory")
            .update({
              quantity_at_hand:
                (sellerInventory.quantity_at_hand || 0) - quantity_moved,
            })
            .eq("item_id", inventory_id)
            .eq("seller", sellerId)
            .run();
        }
      }
    }

    await supastash.from(TABLE_NAME).delete().eq("id", id).run();

    await supastash.from("transfer_items").delete().eq("transfer_id", id).run();

    return id;
  } catch (error: any) {
    showToast("error", "Action failed", `Error: ${error.message}`);
    throw error;
  }
}

export async function updateSellersInventory(
  seller_id: string,
  inventory_id: string,
  new_quantity: number,
  returned_by: string,
) {
  try {
    const returnId = uuid.v4() as string;

    // Get current quantity_at_hand
    const { data: sellerInventory } = await supastash
      .from("sellers_inventory")
      .select("*")
      .eq("seller", seller_id)
      .eq("item_id", inventory_id)
      .single()
      .run();

    if (!sellerInventory) {
      throw new Error("Seller inventory not found");
    }

    const old_quantity = sellerInventory.quantity_at_hand;
    const difference = old_quantity - new_quantity;

    // Update seller's inventory
    await supastash
      .from("sellers_inventory")
      .update({
        quantity_at_hand: new_quantity,
      })
      .eq("seller", seller_id)
      .eq("item_id", inventory_id)
      .run();

    // Add difference to inventory
    const { data: inventoryItem } = await supastash
      .from("inventory")
      .select("*")
      .eq("id", inventory_id)
      .single()
      .run();

    await supastash
      .from("inventory")
      .update({
        quantity: (inventoryItem.quantity || 0) + difference,
      })
      .eq("id", inventory_id)
      .run();

    // Add to returns table
    if (difference > 0) {
      await supastash
        .from("returns")
        .insert({
          id: returnId,
          seller: seller_id,
          item_id: inventory_id,
          quantity: difference,
          returned_by,
        })
        .run();
    }

    return { success: true, message: "Inventory updated successfully" };
  } catch (error: any) {
    showToast("error", "Something went wrong", `Error: ${error.message}`);
    throw error;
  }
}
