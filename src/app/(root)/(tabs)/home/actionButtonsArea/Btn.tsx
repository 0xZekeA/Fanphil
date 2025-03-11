import HapticButton from "@/components/HapticsButton";
import { COLORS } from "@/utils/colors";
import { Scale } from "@/utils/scaling";
import React from "react";
import { Text } from "react-native";
import styles from "../styles/styles";

const Btn = ({
  bgColor,
  title,
  onPress,
}: {
  bgColor: string;
  title: string;
  onPress: () => void;
}) => {
  return (
    <HapticButton
      style={[styles.actionBtn, { backgroundColor: bgColor }]}
      className="flex-1 justify-center"
      onPress={onPress}
    >
      <Text
        style={{
          fontSize: Scale.font(16),
          lineHeight: Scale.lineHeight(16),
          color: COLORS.gray700,
        }}
        className="font-JakartaMedium"
      >
        {title}
      </Text>
    </HapticButton>
  );
};

export default Btn;
