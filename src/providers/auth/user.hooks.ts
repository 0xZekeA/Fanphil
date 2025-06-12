import { supabase } from "$root/lib/supabase";
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
import { supastash } from "supastash";

const useUserRealtimeData = (
  session: any,
  setLoading: Dispatch<SetStateAction<boolean>>,
  loaded: boolean,
) => {
  const [data, setData] = useState<User | null>(null);

  const updateUser = useCallback(
    async (
      full_name: string,
      email: string,
      phone_number: string,
      role: string,
      pfp: string,
      address: string,
      user_id: string,
    ) => {
      const { data: updatedUser }: { data: User | null } = await supastash
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
        .single()
        .run();

      setData(updatedUser);
    },
    [],
  );

  const clearSessionFromSecureStore = useCallback(async () => {
    await SecureStore.deleteItemAsync("session_token");
    await AsyncStorage.removeItem("user_id");
  }, []);

  const getUser = useCallback(async () => {
    const userId = await AsyncStorage.getItem("user_id");
    if (!userId) {
      setData(null);
      return null;
    }
    const { data: user }: { data: User | null } = await supastash
      .from("users")
      .select("*")
      .eq("id", userId)
      .single()
      .run();

    if (user) {
      setData(user);
      setLoading(false);
      return user;
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
      throw error;
    }

    setData(data);
    setLoading(false);
    return data as User;
  }, []);

  useEffect(() => {
    if (!session && loaded) {
      setLoading(false);
      clearSessionFromSecureStore();
      return;
    }

    getUser();
  }, [session, loaded]);

  return { data, updateUser, getUser };
};

export default useUserRealtimeData;
