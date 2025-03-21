import { icons } from "$root/constants/assets";
import { COLORS } from "@/utils/colors";
import { Scale } from "@/utils/scaling";
import { router } from "expo-router";
import React from "react";
import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import HapticButton from "./HapticsButton";

const BackButton = ({
  title,
  onPress,
  styling,
}: {
  title: string;
  onPress?: () => void;
  styling?: StyleProp<ViewStyle>;
}) => {
  return (
    <View
      style={[{ paddingHorizontal: Scale.moderate(8) }, styling]}
      className="flex flex-row items-center"
    >
      <HapticButton onPress={onPress ?? (() => router.back())}>
        <View
          style={{
            width: Scale.moderate(32),
            height: Scale.moderate(32),
            borderRadius: 80,
          }}
          className="items-center justify-center"
        >
          <Image source={icons.backArrow} style={styles.iconStyle} />
        </View>
      </HapticButton>
      <Text
        style={[styles.textHeader, { marginLeft: Scale.moderate(16) }]}
        className="font-JakartaMedium"
      >
        {title}
      </Text>
    </View>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  iconStyle: {
    width: Scale.moderate(24),
    height: Scale.moderate(24),
    resizeMode: "contain",
  },
  textHeader: {
    color: COLORS.gray800,
    fontSize: Scale.font(20),
    lineHeight: Scale.lineHeight(20),
  },
});
