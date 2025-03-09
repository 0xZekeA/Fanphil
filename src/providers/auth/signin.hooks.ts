import { supabase } from "@/lib/supabase";
import { showToast } from "@/src/utils/notification";
import { zodResolver } from "@hookform/resolvers/zod";
import { Session } from "@supabase/supabase-js";
import { router } from "expo-router";
import { Dispatch, SetStateAction, useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LoginFormData } from "./authpro.types";

const useSigninHooks = (
  setSession: Dispatch<SetStateAction<Session | null>>,
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
      const {
        error,
        data: { session },
      } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) throw error;

      if (session) {
        setSession(session);

        router.push("/");

        showToast(
          "success",
          `Welcome ${(session?.user.email || "").split("@")[0]}`,
          "We've logged you in successfully",
        );
      }
    } catch (error: any) {
      console.error("Failed to sign in", error);
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
