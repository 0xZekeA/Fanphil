import { useCopyAnimation } from "@/providers/copy/CopyProvider";
import { COLORS } from "@/utils/colors";
import { Scale } from "@/utils/scaling";
import React from "react";
import { Animated, Text } from "react-native";

const CopyPopup = () => {
  const { visible, fadeAnim } = useCopyAnimation();

  if (!visible) return null;

  return (
    <Animated.View
      style={{
        position: "absolute",
        top: Scale.moderate(50),
        alignSelf: "center",
        backgroundColor: COLORS.gray600,
        paddingVertical: Scale.moderate(6),
        paddingHorizontal: Scale.moderate(12),
        borderRadius: 6,
        opacity: fadeAnim,
        zIndex: 999,
      }}
    >
      <Text className="text-white text-sm">Copied!</Text>
    </Animated.View>
  );
};

export default CopyPopup;
