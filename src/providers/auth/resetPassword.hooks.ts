import { supabase } from "$root/lib/supabase";
import { showToast } from "@/utils/notification";
import { useCallback } from "react";

const useResetPasswordHooks = () => {
  const resetPassword = useCallback(async (emailAddress: string) => {
    if (!emailAddress) {
      showToast("error", "Can't find an email address");
      return;
    }
    const targetEmail = emailAddress.trim();

    if (!targetEmail) {
      showToast(
        "error",
        "Email not found",
        "Please provide a valid email address.",
      );
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(targetEmail);

    if (error) {
      showToast("error", "Password reset failed", `Error: ${error.message}`);
      return;
    }

    showToast(
      "success",
      "Reset link sent",
      `Check your inbox ${targetEmail} for a password reset link.`,
    );
  }, []);

  return { resetPassword };
};

export default useResetPasswordHooks;
