import { supabase } from "@/lib/supabase";
import { showToast } from "@/src/utils/notification";
import { Session } from "@supabase/supabase-js";
import { router } from "expo-router";
import { Dispatch, SetStateAction } from "react";

const useSignoutHooks = (
  setSession: Dispatch<SetStateAction<Session | null>>,
) => {
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) throw error;

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
