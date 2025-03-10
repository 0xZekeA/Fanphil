import uuid from "react-native-uuid";
import { getDb } from "./database";

export const addUser = async (
  full_name: string,
  email: string,
  phone_number: string,
  role: string,
  pfp: string,
  address: string,
  created_by: string,
) => {
  const db = await getDb();
  const id = uuid.v4() as string;
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
  const db = await getDb();
  const now = new Date().toISOString();

  await db.runAsync(
    "UPDATE users SET full_name = ?, email = ?, phone_number = ?, role = ?, pfp = ?, address = ?, updated_at = ?, synced_at = 0 WHERE id = ?",
    [full_name, email, phone_number, role, pfp, address, now, user_id],
  );

  return user_id;
};

export const getUsers = async (): Promise<User[]> => {
  const db = await getDb();
  return await db.getAllAsync("SELECT * FROM users ORDER BY created_at DESC");
};

export const deleteUser = async (user_id: string) => {
  const db = await getDb();
  await db.runAsync(
    "UPDATE sales SET is_active = 0, synced_at = NULL WHERE id = ?",
    [user_id],
  );
  return user_id;
};
