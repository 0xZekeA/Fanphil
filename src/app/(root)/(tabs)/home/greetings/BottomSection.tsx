import { Scale } from "@/utils/scaling";
import React from "react";
import { Text, View } from "react-native";
import useUserDetailsHooks from "../hooks/userDetails.hooks";
import styles from "../styles/styles";

const BottomSection = () => {
  const { firstName } = useUserDetailsHooks();

  return (
    <View
      style={{
        rowGap: Scale.moderate(4),
        paddingHorizontal: Scale.moderate(8),
      }}
    >
      <Text style={styles.textXLarge} className="font-JakartaSemiBold">
        Hi {firstName}
      </Text>
      <Text style={styles.textXLarge} className="font-Jakarta">
        Hope you're having the best day?
      </Text>
    </View>
  );
};

export default BottomSection;
