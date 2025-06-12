import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import Constants from "expo-constants";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_PROJECT_URL ?? "";
const supabaseServiceKey =
  Constants.expoConfig?.extra?.supabaseServiceKey ?? "";

export const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
