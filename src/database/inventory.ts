import { Item } from "@/types/purchases.type";
import { capitalizeItem } from "@/utils/capitalize";
import { showToast } from "@/utils/notification";
import uuid from "react-native-uuid";
import { supastash } from "supastash";
import { addPurchase } from "./purchases";

const TABLE_NAME = "inventory";

export async function addInventory(
  name: string,
  quantity: string,
  cost_price: string,
  original_selling_price: string,
  selling_price: string,
  increment: number,
  size: string,
  unit: string,
  last_edited_by: string,
  created_by: string,
) {
  try {
    const id = uuid.v4().toString();

    await supastash
      .from(TABLE_NAME)
      .insert({
        id,
        name: capitalizeItem(name),
        quantity: 0,
        cost_price: Number(cost_price),
        original_selling_price: Number(original_selling_price),
        selling_price: Number(selling_price),
        increment: Number(increment),
        size: Number(size),
        unit: unit.toLowerCase(),
        last_edited_by,
        created_by,
      })
      .run();

    const item: Item[] = [{ id, name, quantity: Number(quantity), stock: 0 }];

    await addPurchase(created_by, item);

    return id;
  } catch (error: any) {
    showToast(
      "error",
      "Failed to add inventory item",
      `Error details: ${error.message}`,
    );
    throw error;
  }
}

export async function updateInventory(
  id: string,
  name: string,
  quantity: string,
  cost_price: string,
  original_selling_price: string,
  selling_price: string,
  increment: string,
  size: string,
  unit: string,
  last_edited_by: string,
) {
  try {
    await supastash
      .from(TABLE_NAME)
      .update({
        name: capitalizeItem(name),
        quantity: Number(quantity),
        cost_price: Number(cost_price),
        original_selling_price: Number(original_selling_price),
        selling_price: Number(selling_price),
        increment: Number(increment),
        size: Number(size),
        unit: unit.toLowerCase(),
        last_edited_by,
      })
      .eq("id", id)
      .run();

    return id;
  } catch (error: any) {
    showToast(
      "error",
      "Failed to update inventory",
      `Error details: ${error.message}`,
    );
    throw error;
  }
}

export async function deleteInventoryItem(id: string): Promise<string> {
  try {
    await supastash
      .from(TABLE_NAME)
      .update({
        is_active: 0,
      })
      .eq("id", id)
      .run();

    return id;
  } catch (error: any) {
    showToast(
      "error",
      "Failed to delete inventory",
      `Error details: ${error.message}`,
    );
    throw error;
  }
}

export async function reactivateInventoryItem(id: string): Promise<string> {
  try {
    await supastash
      .from(TABLE_NAME)
      .update({
        is_active: 1,
      })
      .eq("id", id)
      .run();

    return id;
  } catch (error: any) {
    showToast(
      "error",
      "Failed to delete inventory",
      `Error details: ${error.message}`,
    );
    throw error;
  }
}

export async function removeItem(
  name: string,
  cost_price: number,
  item_id: string,
  quantity: number,
  last_edited_by: string,
) {
  try {
    const { data: inventoryItem } = await supastash
      .from(TABLE_NAME)
      .select("*")
      .eq("id", item_id)
      .single()
      .run();

    await supastash
      .from(TABLE_NAME)
      .update({
        quantity: (inventoryItem.quantity || 0) - quantity,
        last_edited_by,
      })
      .eq("id", item_id)
      .run();

    const expenseId = uuid.v4().toString();
    const reason = `Removed items ${name.slice(0, 12)} x${quantity}`;
    const cost = Number(cost_price) * Number(quantity);

    await supastash
      .from(TABLE_NAME)
      .insert({
        id: expenseId,
        reason,
        cost,
        created_by: last_edited_by,
        last_edited_by,
      })
      .run();

    showToast(
      "success",
      `${quantity} ${
        Number(quantity) === 1 ? "item" : "items"
      } removed successfully`,
    );

    return item_id;
  } catch (error: any) {
    showToast(
      "error",
      "Was unable to remove items",
      `Error details: ${error.message}`,
    );
    throw error;
  }
}
