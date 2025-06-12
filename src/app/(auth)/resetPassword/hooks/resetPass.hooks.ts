import { supabase } from "$root/lib/supabase";
import { showToast } from "@/utils/notification";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import passwordSchema from "../constants/formSchema";

const useResetPassHooks = () => {
  const [isScreenDisabled, setIsScreenDisabled] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    mode: "onChange",
  });

  const resetPass = useCallback(async (data: PasswordFormData) => {
    if (!data) return;
    try {
      const { error } = await supabase.auth.updateUser({
        password: data.password1,
      });

      if (error) throw error;
      showToast("success", "Your password has been updated successfully.");
      setIsScreenDisabled(true);
    } catch (error: any) {
      showToast(
        "error",
        "Failed to change your password",
        `Details: ${error.message}`,
      );
    }
  }, []);

  const onSubmit = useCallback(
    () =>
      handleSubmit(async (data: PasswordFormData) => {
        await resetPass(data);
        console.log("Resetting password", " → ", data.password1);
      })(),
    [handleSubmit, resetPass],
  );

  const handleBack = useCallback(() => {
    try {
      if (router.canGoBack()) {
        router.back();
      } else {
        router.push("/(auth)/signIn");
      }
    } catch (error) {
      console.log(error);
      router.replace("/(auth)/signIn");
    }
  }, []);

  return {
    control,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit,
    isScreenDisabled,
    handleBack,
  };
};

export default useResetPassHooks;
