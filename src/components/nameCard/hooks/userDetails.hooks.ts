import { COLORS } from "@/utils/colors";
import { useCallback } from "react";

const useUserDetails = () => {
  const getSyncedIndicatorColor = useCallback(
    (user: User) =>
      (user.synced_at || "").length > 1 || user.synced_at === undefined
        ? COLORS.mint500
        : COLORS.pastel200,
    [],
  );

  return { getSyncedIndicatorColor };
};

export default useUserDetails;
