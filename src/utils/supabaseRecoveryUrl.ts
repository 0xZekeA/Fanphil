import { supabase } from "$root/lib/supabase";
import * as Linking from "expo-linking";

const prefix = Linking.createURL("/");

function parseSupabaseUrl(url: string) {
  let parsedUrl = url;
  if (url.includes("#")) {
    parsedUrl = url.replace("#", "?");
  }

  return parsedUrl;
}

async function getInitialURL() {
  const url = await Linking.getInitialURL();
  console.log("🔗 Initial deep link:", url);

  if (url !== null) {
    return parseSupabaseUrl(url);
  }

  return url;
}

function receiveUrlFromDeepLink(listener: (url: string) => void) {
  let alreadyHandled = false;

  const onReceiveURL = async ({ url }: { url: string }) => {
    console.log("📥 Deep link received while app is open:", url);
    const transformedUrl = parseSupabaseUrl(url);
    const parsedUrl = Linking.parse(transformedUrl);

    const access_token = parsedUrl.queryParams?.access_token;
    const refresh_token = parsedUrl.queryParams?.refresh_token;
    if (!access_token || !refresh_token) {
      console.warn(
        "⚠️ Deep link received but tokens were not found in the URL.",
      );
    }

    if (
      !alreadyHandled &&
      typeof access_token === "string" &&
      typeof refresh_token === "string"
    ) {
      const { error } = await supabase.auth.setSession({
        access_token,
        refresh_token,
      });
      alreadyHandled = true;
      if (error) {
        console.error("❌ Failed to set Supabase session:", error.message);
      } else {
        console.log("✅ Supabase session restored from deep link");
      }
    }

    listener(transformedUrl);
  };
  const subscription = Linking.addEventListener("url", onReceiveURL);

  return () => {
    subscription.remove();
  };
}

export const linking = {
  prefixes: [prefix],
  config: {
    screens: {
      ResetPasswordScreen: "/(auth)/resetPassword",
    },
  },
  getInitialURL,
  receiveUrlFromDeepLink,
};
