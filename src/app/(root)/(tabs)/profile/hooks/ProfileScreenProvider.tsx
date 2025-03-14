import { useAuthProvider } from "@/providers/auth";
import { ProfileScreenContextTypes } from "@/types/profile";
import * as Haptics from "expo-haptics";
import { createContext, PropsWithChildren, useContext, useState } from "react";
import profileData from "../constants/profileDetails";
import userInfo from "../constants/userDetails";
import useMessagePopUpHooks from "./messagePopUp.hooks";

const ProfileScreenContext = createContext<
  ProfileScreenContextTypes | undefined
>(undefined);

const ProfileScreenProvider = ({ children }: PropsWithChildren) => {
  const { signOut, resetPassword } = useAuthProvider();
  const { isMessageShown, message, onClose, showMessage, position } =
    useMessagePopUpHooks();
  const { user } = useAuthProvider();
  const [isUserDetailsShown, setIsUserDetailsShown] = useState(false);

  const onPress = (event: any, item: string) => {
    switch (item) {
      case "User Information":
        return setIsUserDetailsShown(true);
      case "Sign Out":
      case "Change Password":
        return showMessage(event);

      default:
        break;
    }
  };

  const handleLongPress = async (item: string) => {
    switch (item) {
      case "Sign Out":
        return await signOut();

      case "Change Password":
        return await resetPassword();

      default:
        return null;
    }
  };

  const handlePress = (
    event: any,
    hapticType: "light" | "heavy" | "medium",
    item: string,
    longPress?: boolean,
  ) => {
    const impactStyle =
      hapticType === "light"
        ? Haptics.ImpactFeedbackStyle.Light
        : hapticType === "heavy"
        ? Haptics.ImpactFeedbackStyle.Heavy
        : Haptics.ImpactFeedbackStyle.Medium;

    Haptics.impactAsync(impactStyle);
    if (longPress) {
      handleLongPress(item);
    }
    if (onPress) {
      onPress(event, item);
    }
  };

  const data: any[] = isUserDetailsShown ? userInfo(user) || [] : profileData;

  return (
    <ProfileScreenContext.Provider
      value={{
        isMessageShown,
        onClose,
        position,
        message,
        handleLongPress,
        handlePress,
        isUserDetailsShown,
        setIsUserDetailsShown,
        data,
      }}
    >
      {children}
    </ProfileScreenContext.Provider>
  );
};
export default ProfileScreenProvider;

export const useProfileScreenContext = () => {
  const context = useContext(ProfileScreenContext);
  if (!context) {
    throw new Error(
      "useProfileScreen must be used within a ProfileScreenProvider",
    );
  }
  return context;
};
