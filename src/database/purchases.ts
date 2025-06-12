import { eventBus } from "@/events/events";
import { Item } from "@/types/purchases.type";
import { showToast } from "@/utils/notification";
import uuid from "react-native-uuid";
import { supastash } from "supastash";

export async function addPurchase(purchased_by: string, selectedItems: Item[]) {
  try {
    const id = uuid.v4().toString();

    await supastash
      .from("purchases")
      .insert({
        id,
        purchased_by,
      })
      .run();

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
}

export async function addPurchaseItem(
  inventory_id: string,
  purchase_id: string,
  quantity: number,
  last_edited_by: string,
) {
  try {
    const id = uuid.v4().toString();

    // Insert purchase item
    await supastash
      .from("purchased_items")
      .insert({
        id,
        inventory_id,
        purchase_id,
        quantity,
        last_edited_by,
      })
      .run();

    // Fetch and Update inventory item quantity

    const { data: inventoryItem } = await supastash
      .from("inventory")
      .select("*")
      .eq("id", inventory_id)
      .single()
      .run();

    if (!inventoryItem) throw new Error("Inventory item not found");

    await supastash
      .from("inventory")
      .update({
        quantity: (inventoryItem.quantity || 0) + quantity,
      })
      .eq("id", inventory_id)
      .run();

    inventoryItem.quantity += quantity;

    // Add to expenses
    const name = inventoryItem.name;
    const expenseId = uuid.v4().toString();
    const reason = `Purchase ${name.slice(0, 12)} x${quantity}`;
    const cost = Number(inventoryItem.cost_price ?? 0) * Number(quantity);

    await supastash
      .from("expenses")
      .insert({
        id: expenseId,
        reason,
        cost,
        created_by: last_edited_by,
        last_edited_by,
      })
      .run();

    return id;
  } catch (error: any) {
    showToast(
      "error",
      "Error adding purchase item",
      `Error details: ${error.message}`,
    );
    throw error;
  }
}

export async function getSpecificPurchaseItems(
  id: string,
): Promise<PurchasedItem[] | null> {
  try {
    const { data: purchasedItems }: { data: PurchasedItem[] | null } =
      await supastash
        .from("purchased_items")
        .select("*")
        .eq("purchase_id", id)
        .run();

    return purchasedItems;
  } catch (error: any) {
    showToast(
      "error",
      "Error fetching transfer items",
      `Error details: ${error.message}`,
    );
    throw error;
  }
}
