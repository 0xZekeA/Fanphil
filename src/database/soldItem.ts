import { eventBus } from "@/events/events";
import { showToast } from "@/utils/notification";
import uuid from "react-native-uuid";
import { supastash } from "supastash";

export async function addSoldItem(
  isAdminOrMgr: boolean,
  sales_id: string,
  item_id: string,
  quantity: number,
  total_price: number,
  sold_by: string,
) {
  try {
    const id = uuid.v4().toString();

    await supastash
      .from("sold_items")
      .insert({
        id,
        sales_id,
        item_id,
        quantity,
        total_price,
        last_edited_by: sold_by,
      })
      .run();

    if (isAdminOrMgr) {
      const { data: inventoryItem }: { data: Inventory | null } =
        await supastash
          .from("inventory")
          .select("*")
          .eq("id", item_id)
          .single()
          .run();

      if (!inventoryItem) return;

      await supastash
        .from("inventory")
        .update({
          quantity: inventoryItem.quantity - quantity,
        })
        .eq("id", item_id)
        .run();
    } else {
      const { data: sellerInventory }: { data: SellersInventory | null } =
        await supastash
          .from("sellers_inventory")
          .select("*")
          .single()
          .eq("item_id", item_id)
          .eq("seller", sold_by)
          .run();

      if (!sellerInventory) return;

      await supastash
        .from("sellers_inventory")
        .update({
          quantity_at_hand: sellerInventory.quantity_at_hand - quantity,
        })
        .run();
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
  } finally {
    eventBus.emit(`refresh:all}`);
  }
}

export async function getSalesSoldItems(
  sales_id: string,
): Promise<SoldItem[] | null> {
  try {
    const { data: soldItems }: { data: SoldItem[] | null } = await supastash
      .from("sold_items")
      .select("*")
      .eq("sales_id", sales_id)
      .is("deleted_at", null)
      .run();

    return soldItems;
  } catch (error: any) {
    showToast(
      "error",
      "Failed to fetch sold items",
      `Error details: ${error.message}`,
    );
    console.error("Error in getSoldItems:", error);
    throw error;
  }
}

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
    // Get the original sold item
    const { data: originalItem }: { data: SoldItem | null } = await supastash
      .from("sold_items")
      .select("*")
      .eq("id", id)
      .single()
      .run();

    if (!originalItem) {
      throw new Error("Sold item not found");
    }

    const quantityDifference = originalItem.quantity - quantity;

    // Update the sold item
    await supastash
      .from("sold_items")
      .update({
        quantity,
        total_price,
        last_edited_by: user_id,
      })
      .eq("id", id)
      .run();

    // If quantity was reduced, return the difference
    if (quantityDifference > 0) {
      const { data: inventoryItem }: { data: Inventory | null } =
        await supastash
          .from("inventory")
          .select("*")
          .eq("id", originalItem.item_id)
          .single()
          .run();

      if (!inventoryItem) return;

      await supastash
        .from("inventory")
        .update({
          quantity: inventoryItem.quantity + quantityDifference,
        })
        .eq("id", originalItem.item_id)
        .run();
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

export async function deleteSoldItem(id: string) {
  try {
    // Get the sold item details
    const { data: item }: { data: SoldItem | null } = await supastash
      .from("sold_items")
      .select("*")
      .eq("id", id)
      .single()
      .run();

    if (!item) return;

    const salesId = item.sales_id;
    const inventoryId = item.item_id;
    const quantitySold = item.quantity;

    // Mark the sold item as deleted
    await supastash.from("sold_items").delete().eq("id", id).run();

    // Return inventory to main inventory
    const { data: inventoryItem }: { data: Inventory | null } = await supastash
      .from("inventory")
      .select("*")
      .eq("id", inventoryId)
      .single()
      .run();

    if (!inventoryItem) return;

    await supastash
      .from("inventory")
      .update({
        quantity: inventoryItem.quantity + quantitySold,
      })
      .eq("id", inventoryId)
      .run();

    // Update the quantity in the sales record
    const { data: distinctItemCount }: { data: { item_count: number } | null } =
      await supastash
        .from("sold_items")
        .select("COUNT(DISTINCT item_id) AS item_count")
        .eq("sales_id", salesId)
        .is("deleted_at", null)
        .single()
        .run();

    if (!distinctItemCount) return;

    await supastash
      .from("sales")
      .update({
        quantity: distinctItemCount?.item_count || 0,
      })
      .eq("id", salesId)
      .run();

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
}
