import { showToast } from "@/utils/notification";
import { getDb } from "./database";

export const addUser = async (
  id: string,
  full_name: string,
  email: string,
  phone_number: string,
  role: string,
  pfp: string,
  address: string,
  created_by: string,
) => {
  try {
    const db = await getDb();
    const now = new Date().toISOString();

    await db.runAsync(
      "INSERT INTO users (id, full_name, email, phone_number, role, pfp, address, created_by, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        id,
        full_name,
        email,
        phone_number,
        role,
        pfp,
        address,
        created_by,
        now,
        now,
      ],
    );

    return id;
  } catch (error: any) {
    showToast("error", "Failed to add user", `Error details: ${error.message}`);
    console.error("Error in addUser:", error);
    throw error;
  }
};

export const updateUser = async (
  full_name: string,
  email: string,
  phone_number: string,
  role: string,
  pfp: string,
  address: string,
  user_id: string,
) => {
  try {
    const db = await getDb();
    const now = new Date().toISOString();

    await db.runAsync(
      "UPDATE users SET full_name = ?, email = ?, phone_number = ?, role = ?, pfp = ?, address = ?, updated_at = ?, synced_at = 0 WHERE id = ?",
      [full_name, email, phone_number, role, pfp, address, now, user_id],
    );

    return user_id;
  } catch (error: any) {
    showToast(
      "error",
      "Failed to update user",
      `Error details: ${error.message}`,
    );
    console.error("Error in updateUser:", error);
    throw error;
  }
};

export const getUsers = async (): Promise<User[]> => {
  try {
    const db = await getDb();
    return await db.getAllAsync("SELECT * FROM users ORDER BY created_at DESC");
  } catch (error: any) {
    showToast(
      "error",
      "Failed to load users",
      `Error details: ${error.message}`,
    );
    console.error("Error in getUsers:", error);
    throw error;
  }
};

export const deleteUser = async (user_id: string) => {
  try {
    const db = await getDb();
    await db.runAsync(
      "UPDATE users SET is_active = 0, synced_at = NULL WHERE id = ?",
      [user_id],
    );
    return user_id;
  } catch (error: any) {
    showToast(
      "error",
      "Failed to delete user",
      `Error details: ${error.message}`,
    );
    console.error("Error in deleteUser:", error);
    throw error;
  }
};

export const reinstateUser = async (user_id: string) => {
  try {
    const db = await getDb();
    await db.runAsync(
      "UPDATE users SET is_active = 1, synced_at = NULL WHERE id = ?",
      [user_id],
    );
    return user_id;
  } catch (error: any) {
    showToast(
      "error",
      "Failed to reinstate user",
      `Error details: ${error.message}`,
    );
    console.error("Error in reinstate:", error);
    throw error;
  }
};
