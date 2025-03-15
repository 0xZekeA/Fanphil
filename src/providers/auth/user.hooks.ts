import { supabase } from "$root/lib/supabase";
import { getDb } from "@/database/database";
import { addUser } from "@/database/users";
import { showToast } from "@/utils/notification";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";

const useUserRealtimeData = (
  session: any,
  setLoading: Dispatch<SetStateAction<boolean>>,
  loaded: boolean,
) => {
  const [data, setData] = useState<User | null>(null);

  const updateUser = async (
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
      "UPDATE users SET full_name = ?, email = ?, phone_number = ?, role = ?, pfp = ?, address = ?, updated_at = ?, synced_at = NULL WHERE id = ?",
      [full_name, email, phone_number, role, pfp, address, now, user_id],
    );

    const updatedUser: User | null = await db.getFirstAsync(
      "SELECT * FROM users WHERE id = ?",
      [user_id],
    );

    setData(updatedUser);
  };

  const clearSessionFromSecureStore = async () => {
    await SecureStore.deleteItemAsync("session_token");
    await AsyncStorage.removeItem("user_id");
  };

  const getUser = useCallback(async () => {
    console.log("fetching locally..");
    const db = await getDb();
    const userId = await AsyncStorage.getItem("user_id");
    if (!userId) {
      setData(null);
      return;
    }
    const user: User | null = await db.getFirstAsync(
      "SELECT * FROM users WHERE id = ?",
      [userId],
    );

    if (user) {
      setData(user);
      setLoading(false);
      return;
    }

    setLoading(true);
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();
    if (error) {
      console.log(error);
      showToast(
        "error",
        "Can not get you data",
        `Error details: ${error.message}`,
      );
      setLoading(false);
      return;
    }

    console.log("Adding user to local database...");

    const id = await addUser(
      userId,
      data.full_name,
      data.email,
      data.phone_number,
      data.role,
      data.pfp,
      data.address,
      data.created_by,
    );

    if (!id) {
      showToast(
        "error",
        "Failed to store your details locally",
        "Contact developer",
      );
    }
    setData(data);
    setLoading(false);
    return;
  }, []);

  useEffect(() => {
    if (!session && loaded) {
      setLoading(false);
      clearSessionFromSecureStore();
      return;
    }

    getUser();
  }, [session, loaded, getUser, setLoading]);

  return { data, updateUser, getUser };
};

export default useUserRealtimeData;
