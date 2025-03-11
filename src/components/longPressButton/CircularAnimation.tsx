import { COLORS } from "@/utils/colors";
import React from "react";
import { Animated } from "react-native";
import Svg, { Circle } from "react-native-svg";
import styles from "./styles";

const CircularAnimation = ({
  isPressing,
  destructive,
  animation,
}: {
  isPressing: boolean;
  destructive?: boolean;
  animation: Animated.Value;
}) => {
  const size = 40;

  const rotateAnimation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    isPressing && (
      <Animated.View
        style={[
          styles.loadingCircle,
          {
            width: size + 20,
            height: size + 20,
            borderRadius: (size + 20) / 2,
            transform: [{ rotate: rotateAnimation }],
            borderColor: destructive ? COLORS.softCoral900 : COLORS.mint500,
          },
        ]}
      >
        <Svg
          width={size + 20}
          height={size + 20}
          viewBox={`0 0 ${size + 20} ${size + 20}`}
        >
          <Circle
            cx={(size + 20) / 2}
            cy={(size + 20) / 2}
            r={(size + 20) / 2 - 2}
            stroke={destructive ? COLORS.softCoral900 : COLORS.mint500}
            strokeWidth="2"
            fill="none"
            strokeDasharray={100}
            strokeDashoffset={20}
            strokeLinecap="round"
          />
        </Svg>
      </Animated.View>
    )
  );
};

export default CircularAnimation;
