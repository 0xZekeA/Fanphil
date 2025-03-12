import { Scale } from "@/utils/scaling";
import React from "react";
import { Animated, Text } from "react-native";
import useMessagePosition from "./message.hooks";
import styles from "./styles";

const MENU_WIDTH = Scale.moderate(200);

const OnpressMessage: React.FC<OnpressMessageProps> = ({
  visible,
  onClose,
  position,
  text,
  width,
}) => {
  const { scaleAnim, fadeAnim, adjustedPosition } = useMessagePosition(
    position,
    onClose,
    visible,
  );

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ scale: scaleAnim }],
          opacity: fadeAnim,
          left: adjustedPosition.x,
          top: adjustedPosition.y,
          width: width || MENU_WIDTH,
        },
      ]}
    >
      <Text style={styles.textCall} className="font-JakartaLight">
        {text}
      </Text>
    </Animated.View>
  );
};

export default OnpressMessage;
