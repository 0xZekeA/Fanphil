import { supabase } from "$root/lib/supabase";
import { wipeTablesOnSignOut } from "@/database/wipeData";
import { showToast } from "@/utils/notification";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Session } from "@supabase/supabase-js";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { Dispatch, SetStateAction, useCallback } from "react";

const useSignoutHooks = (
  setSession: Dispatch<SetStateAction<Session | null>>,
  setSessionToken: Dispatch<SetStateAction<string | null>>,
) => {
  const signOut = useCallback(async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) throw error;

      await SecureStore.deleteItemAsync("session_token");
      await AsyncStorage.removeItem("user_id");
      await wipeTablesOnSignOut();

      setSession(null);
      setSessionToken(null);
      router.push("/(auth)/signIn");
    } catch (error: any) {
      showToast(
        "error",
        "Failed to sign you out",
        `Error details: ${error.message}`,
      );
    }
  }, [setSession, setSessionToken]);

  return { signOut };
};

export default useSignoutHooks;
