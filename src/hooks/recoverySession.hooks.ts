import { supabase } from "$root/lib/supabase";
import * as Linking from "expo-linking";
import { useEffect } from "react";

const useRecoverySession = () => {
  const handleSessionFromUrl = async (url: string | null) => {
    if (!url) return;

    const hash = url.includes("#") ? url.split("#")[1] : "";
    const params = new URLSearchParams(hash);
    const access_token = params.get("access_token");
    const refresh_token = params.get("refresh_token");

    if (access_token && refresh_token) {
      const { error } = await supabase.auth.setSession({
        access_token,
        refresh_token,
      });

      if (error) console.error("❌ Session failed:", error.message);
      else console.log("✅ Session restored");
    }
  };

  useEffect(() => {
    // 1. Handle initial URL
    const restoreInitialSession = async () => {
      const initialUrl = await Linking.getInitialURL();
      await handleSessionFromUrl(initialUrl);
    };

    restoreInitialSession();

    // 2. Handle future URLs
    const sub = Linking.addEventListener("url", ({ url }) => {
      handleSessionFromUrl(url);
    });

    return () => sub.remove();
  }, []);
};

export default useRecoverySession;
