import { Scale } from "@/utils/scaling";
import React from "react";
import { Text, View } from "react-native";
import useUserDetails from "./hooks/userDetails.hooks";
import styles from "./styles/styles";

const TopSection = ({ user }: { user: User }) => {
  const { getSyncedIndicatorColor } = useUserDetails();

  const bgColor = getSyncedIndicatorColor(user);

  return (
    <View
      style={{ columnGap: Scale.moderate(4) }}
      className="flex-row items-center justify-between"
    >
      <Text style={styles.textName} className="font-JakartaSemiBold">
        {user?.full_name || "User"}
      </Text>
      <View
        style={[
          styles.syncedIndicator,
          {
            backgroundColor: bgColor,
          },
        ]}
      />
    </View>
  );
};

export default TopSection;
