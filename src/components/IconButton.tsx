import { COLORS } from "@/utils/colors";
import { Scale } from "@/utils/scaling";
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import HapticButton from "./HapticsButton";

const IconButton = ({
  icon,
  onPress,
  color,
}: {
  icon: any;
  onPress: (...args: any[]) => void;
  color?: string;
}) => {
  return (
    <HapticButton onPress={onPress}>
      <View style={styles.btnContainer} className="items-center justify-center">
        <Image source={icon} style={[styles.iconStyle, { tintColor: color }]} />
      </View>
    </HapticButton>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  btnContainer: {
    width: Scale.moderate(48),
    height: Scale.moderate(48),
    borderRadius: 360,
    backgroundColor: COLORS.mint100,
  },
  iconStyle: {
    width: Scale.moderate(24),
    height: Scale.moderate(24),
    resizeMode: "contain",
    tintColor: COLORS.gray800,
  },
});
