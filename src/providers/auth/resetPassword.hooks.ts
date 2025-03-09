import { supabase } from "$root/lib/supabase";
import { showToast } from "@/utils/notification";

const useResetPasswordHooks = (user: User | null) => {
  const resetPassword = async () => {
    if (!user) return;
    const { error } = await supabase.auth.resetPasswordForEmail(user.email);

    if (error) {
      showToast(
        "error",
        "We encoutered an error while requesting the paswword reset",
        `Error details: ${error.message}`,
      );
      return;
    }

    showToast(
      "success",
      "A password reset link was sent to your email",
      `Please follow the link to change your password`,
    );
  };
  return { resetPassword };
};

export default useResetPasswordHooks;
