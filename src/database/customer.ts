import { showToast } from "@/utils/notification";
import uuid from "react-native-uuid";
import { supastash } from "supastash";

const TABLE_NAME = "customers";

export async function addCustomer(
  name: string,
  phone: string,
  address: string,
) {
  try {
    const id = uuid.v4().toString();

    await supastash
      .from(TABLE_NAME)
      .insert({
        id,
        name,
        phone,
        address,
      })
      .run();

    return id;
  } catch (error: any) {
    showToast(
      "error",
      "Failed to add customer",
      `Error details: ${error.message}`,
    );
    throw error;
  }
}

export async function updateCustomer(
  id: string,
  name: string,
  phone?: string,
  address?: string,
) {
  try {
    await supastash
      .from(TABLE_NAME)
      .update({
        name,
        phone,
        address,
      })
      .eq("id", id)
      .run();
    return id;
  } catch (error: any) {
    showToast(
      "error",
      "Failed to update customer",
      `Error details: ${error.message}`,
    );
    throw error;
  }
}

export async function deleteCustomer(id: string): Promise<string> {
  try {
    await supastash.from(TABLE_NAME).delete().eq("id", id).run();

    return id;
  } catch (error: any) {
    showToast(
      "error",
      "Failed to delete customer",
      `Error details: ${error.message}`,
    );
    throw error;
  }
}
