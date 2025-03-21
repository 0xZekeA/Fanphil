import BackButton from "@/components/BackButton";
import { Scale } from "@/utils/scaling";
import React from "react";
import { View } from "react-native";
import { useProfileScreenContext } from "../hooks/ProfileScreenProvider";

const ProfileBackButton = () => {
  const { isUserDetailsShown, setIsUserDetailsShown } =
    useProfileScreenContext();
  return (
    isUserDetailsShown && (
      <View style={{ marginLeft: Scale.moderate(20) }}>
        <BackButton
          title="Profile"
          onPress={() => setIsUserDetailsShown(false)}
        />
      </View>
    )
  );
};

export default ProfileBackButton;
