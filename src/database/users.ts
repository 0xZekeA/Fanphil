import { showToast } from "@/utils/notification";
import { supastash } from "supastash";

export async function addUser(
  id: string,
  full_name: string,
  email: string,
  phone_number: string,
  role: string,
  pfp: string,
  address: string,
  created_by: string,
) {
  try {
    const { data: user }: { data: User | null } = await supastash
      .from("users")
      .select("*")
      .eq("id", id)
      .single()
      .run();

    if (user) return;

    await supastash
      .from("users")
      .insert({
        id,
        full_name,
        email,
        phone_number,
        role,
        pfp,
        address,
        created_by,
      })
      .run();

    return id;
  } catch (error: any) {
    showToast("error", "Failed to add user", `Error details: ${error.message}`);
    console.error("Error in addUser:", error);
    throw error;
  }
}

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
    await supastash
      .from("users")
      .update({
        full_name,
        email,
        phone_number,
        role,
        pfp,
        address,
      })
      .eq("id", user_id)
      .run();

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

export const getUsers = async (): Promise<User[] | null> => {
  try {
    const { data: users }: { data: User[] | null } = await supastash
      .from("users")
      .select("*")
      .run();

    return users;
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
    await supastash
      .from("users")
      .update({
        is_active: 0,
      })
      .eq("id", user_id)
      .run();

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
    await supastash
      .from("users")
      .update({
        is_active: 1,
      })
      .eq("id", user_id)
      .run();

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
