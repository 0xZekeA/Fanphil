import { supabase } from "$root/lib/supabase";
import { showToast } from "@/utils/notification";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Session } from "@supabase/supabase-js";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { Dispatch, SetStateAction } from "react";

const useSignoutHooks = (
  setSession: Dispatch<SetStateAction<Session | null>>,
) => {
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) throw error;

      await SecureStore.deleteItemAsync("session_token");
      await AsyncStorage.removeItem("user_id");

      router.push("/");

      showToast(
        "success",
        "You signed out successfully",
        "Hope to have you back soon!",
      );

      setSession(null);
    } catch (error: any) {
      showToast(
        "error",
        "Failed to sign you out",
        `Error details: ${error.message}`,
      );
    }
  };

  return { signOut };
};

export default useSignoutHooks;
