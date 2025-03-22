import { supabase } from "$root/lib/supabase";
import { downloadDataFromSupabase } from "@/database/loadDataFromSupabase";
import { showToast } from "@/utils/notification";
import { zodResolver } from "@hookform/resolvers/zod";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Session } from "@supabase/supabase-js";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { Dispatch, SetStateAction, useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LoginFormData } from "./authpro.types";

const useSigninHooks = (
  setSession: Dispatch<SetStateAction<Session | null>>,
  setSessionToken: Dispatch<SetStateAction<string | null>>,
  getUser: () => Promise<User | null>,
  setIsSigningIn: Dispatch<SetStateAction<boolean>>,
) => {
  const loginSchema = z.object({
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const signIn = useCallback(async (data: LoginFormData) => {
    try {
      setIsSigningIn(true);
      const {
        error,
        data: { session },
      } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) throw error;

      if (session) {
        await SecureStore.setItemAsync("session_token", session.access_token);
        await AsyncStorage.setItem("user_id", session.user.id);
        await downloadDataFromSupabase();
        const user = await getUser();
        if (user) {
          console.log("Sending user in...");
          router.push("/");
        }

        setSession(session);
        setSessionToken(session.access_token);

        setIsSigningIn(false);

        showToast(
          "success",
          `Welcome ${
            user
              ? (user.full_name || "").split(" ")[0]
              : (session.user.email || "").split("@")[0]
          }`,
          "We've logged you in successfully",
        );
      }
    } catch (error: any) {
      console.error("Failed to sign in", error);
      setIsSigningIn(false);
      showToast(
        "error",
        "Error while attempting to sign you in",
        `Error details: ${error.message}`,
      );
    }
  }, []);

  const onSubmit = handleSubmit(signIn);

  return { control, onSubmit, errors, isSubmitting };
};

export default useSigninHooks;
