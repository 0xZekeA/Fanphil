import BackButton from "@/components/BackButton";
import React from "react";
import { useProfileScreenContext } from "../hooks/ProfileScreenProvider";

const ProfileBackButton = () => {
  const { isUserDetailsShown, setIsUserDetailsShown } =
    useProfileScreenContext();
  return (
    isUserDetailsShown && (
      <BackButton
        title="Profile"
        onPress={() => setIsUserDetailsShown(false)}
      />
    )
  );
};

export default ProfileBackButton;
