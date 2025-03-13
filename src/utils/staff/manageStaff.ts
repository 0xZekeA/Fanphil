import { deleteUser, reinstateUser } from "@/database/users";
import { showToast } from "@/utils/notification";
import { Dispatch, SetStateAction } from "react";
import { Linking } from "react-native";

export const suspendOrReinstateAgent = async (
  item: any,
  setIsLoading: Dispatch<SetStateAction<boolean>>,
  reinstate?: boolean,
) => {
  if (!item) return;
  setIsLoading(true);
  if (reinstate) {
    const id = await reinstateUser(item.id);

    if (!id) {
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
    showToast(
      "success",
      "Operation completed!",
      `User was reinstated successfully`,
    );
    return;
  }

  const id = deleteUser(item.id);

  if (!id) {
    console.error("An error occurred while attempting to suspend agent");
    setIsLoading(false);
    return;
  }
  setIsLoading(false);
  showToast(
    "success",
    "Operation completed!",
    `User was suspended successfully`,
  );
};

export const dialNumber = (phoneNumber: string) => {
  if (!phoneNumber) {
    showToast("error", "Phone number is missing");
    return;
  }

  const url = `tel:${phoneNumber}`;

  Linking.canOpenURL(url)
    .then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        showToast("error", "Phone dialer is not available on this device");
      }
    })
    .catch((err) => console.error("An error occurred", err));
};
