import { eventBus } from "@/events/events";
import { showToast } from "@/utils/notification";
import uuid from "react-native-uuid";
import { supastash } from "supastash";

const TABLE_NAME = "sales";

export async function addSale(
  quantity: number,
  sold_by: string,
  customer: string,
  total_price: number,
  deposit: number,
  profit: number,
) {
  try {
    const id = uuid.v4().toString();

    await supastash
      .from("sales")
      .insert({
        id,
        quantity,
        sold_by,
        customer_id: customer,
        total_price,
        deposit,
        profit,
        last_edited_by: sold_by,
      })
      .run();

    return id;
  } catch (error: any) {
    showToast("error", "Failed to add sale", `Error details: ${error.message}`);
    throw error;
  } finally {
    eventBus.emit(`refresh:${TABLE_NAME}`);
  }
}

export async function updateSale(
  quantity: number,
  sold_by: string,
  total_price: number,
  deposit: number,
  profit: number,
  id: string,
  user_id: string,
) {
  try {
    await supastash
      .from("sales")
      .update({
        quantity,
        sold_by,
        total_price,
        deposit,
        profit,
        last_edited_by: user_id,
      })
      .eq("id", id)
      .run();

    return id;
  } catch (error: any) {
    showToast(
      "error",
      "Failed to update sale",
      `Error details: ${error.message}`,
    );
    throw error;
  } finally {
    eventBus.emit(`refresh:${TABLE_NAME}`);
  }
}

export const deleteSale = async (id: string) => {
  try {
    const { data: soldItems }: { data: SoldItem[] | null } = await supastash
      .from("sold_items")
      .select("*")
      .eq("sales_id", id)
      .is("deleted_at", null)
      .run();

    const { data: soldBy }: { data: { sold_by: string } | null } =
      await supastash
        .from("sales")
        .select("sold_by")
        .eq("id", id)
        .single()
        .run();

    await supastash.from("sales").delete().eq("id", id).run();

    if (!soldBy || !soldItems) return;

    for (const item of soldItems) {
      const { data: inventoryItems }: { data: Inventory[] | null } =
        await supastash
          .from("inventory")
          .select("*")
          .eq("id", item.item_id)
          .run();

      if (!inventoryItems) return;

      const inventoryItemsToUpdate = inventoryItems.map((item) => {
        return {
          id: item.id,
          quantity: item.quantity - item.quantity,
        };
      });

      const returns = inventoryItems.map((item) => {
        return {
          id: uuid.v4().toString(),
          seller: soldBy.sold_by,
          item_id: item.id,
          quantity: item.quantity,
          returned_by: soldBy.sold_by,
        };
      });

      await supastash.from("inventory").upsert(inventoryItemsToUpdate).run();
      await supastash.from("returns").insert(returns).run();
    }

    await supastash.from("sold_items").delete().eq("sales_id", id).run();

    return id;
  } catch (error: any) {
    showToast(
      "error",
      "Failed to delete this sale",
      `Error details: ${error.message}`,
    );
    throw error;
  }
};

export async function addDeposit(deposit: number, id: string, user_id: string) {
  try {
    await supastash
      .from("sales")
      .update({
        deposit,
        last_edited_by: user_id,
      })
      .eq("id", id)
      .run();

    return id;
  } catch (error: any) {
    showToast(
      "error",
      "Failed to update sale",
      `Error details: ${error.message}`,
    );
    throw error;
  }
}
