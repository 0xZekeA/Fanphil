import { showToast } from "@/utils/notification";
import uuid from "react-native-uuid";
import { supastash } from "supastash";

const TABLE_NAME = "expenses";

export async function addExpense(
  reason: string,
  cost: number,
  created_by: string,
) {
  try {
    const id = uuid.v4().toString();

    await supastash
      .from(TABLE_NAME)
      .insert({
        id,
        reason,
        cost,
        created_by,
        last_edited_by: created_by,
      })
      .run();

    return id;
  } catch (error: any) {
    showToast(
      "error",
      "Error in addExpense:",
      `Error details: ${error.message}`,
    );
    throw error;
  }
}

export async function updateExpense(
  reason: string,
  cost: number,
  last_edited_by: string,
  id: string,
) {
  try {
    await supastash
      .from(TABLE_NAME)
      .update({
        reason,
        cost,
        last_edited_by,
      })
      .eq("id", id)
      .run();

    return id;
  } catch (error: any) {
    showToast(
      "error",
      "Error in updateExpense:",
      `Error details: ${error.message}`,
    );
    throw error;
  }
}

export async function deleteExpense(id: string): Promise<string> {
  try {
    await supastash.from(TABLE_NAME).delete().eq("id", id).run();

    return id;
  } catch (error: any) {
    showToast(
      "error",
      "Error in deleteExpense:",
      `Error details: ${error.message}`,
    );
    throw error;
  }
}
