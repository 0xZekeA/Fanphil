import { showToast } from "@/utils/notification";
import { getDb } from "./database";

export const addCustomer = async (
  name: string,
  phone: string,
  address: string,
) => {
  try {
    const db = await getDb();
    const now = new Date().toISOString();

    await db.runAsync(
      `INSERT INTO customers 
      (name, phone, address, created_at, updated_at) 
      VALUES (?, ?, ?, ?, ?)`,
      [name, phone, address, now, now],
    );

    return phone;
  } catch (error: any) {
    showToast(
      "error",
      "Failed to add customer",
      `Error details: ${error.message}`,
    );
    throw error;
  }
};

export const updateCustomer = async (
  id: number,
  name: string,
  phone: string,
  address: string,
) => {
  try {
    const db = await getDb();
    const now = new Date().toISOString();

    await db.runAsync(
      `UPDATE customers 
      SET name = ?, phone = ?, address = ?, updated_at = ?, synced_at = NULL
      WHERE id = ?`,
      [name, phone, address, now, id],
    );

    return id;
  } catch (error: any) {
    showToast(
      "error",
      "Failed to update customer",
      `Error details: ${error.message}`,
    );
    throw error;
  }
};

export const getCustomers = async () => {
  try {
    const db = await getDb();
    return await db.getAllAsync(
      "SELECT * FROM customers WHERE deleted = 0 ORDER BY created_at DESC",
    );
  } catch (error: any) {
    showToast(
      "error",
      "Failed to fetch customers",
      `Error details: ${error.message}`,
    );
    throw error;
  }
};

export const deleteCustomer = async (id: number) => {
  try {
    const db = await getDb();

    await db.runAsync(
      "UPDATE sales SET is_active = 0, synced_at = NULL WHERE id = ?",
      [id],
    );

    return id;
  } catch (error: any) {
    showToast(
      "error",
      "Failed to delete customer",
      `Error details: ${error.message}`,
    );
    throw error;
  }
};
