import { Scale } from "@/utils/scaling";
import { useEffect, useRef } from "react";
import { Animated, Dimensions } from "react-native";

// Change in styles too
const MENU_PADDING = Scale.moderate(8);
const MENU_WIDTH = Scale.moderate(200);
const CONTAINER_HEIGHT = Scale.moderate(40);

const useMessagePosition = (
  position: PressPosition,
  onClose: () => void,
  visible: boolean,
) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

  const adjustedPosition = {
    x: Math.max(
      0,
      Math.min(position.x - 40, screenWidth - MENU_WIDTH - MENU_PADDING),
    ),
    y: Math.max(
      0,
      Math.min(position.y - 40, screenHeight - CONTAINER_HEIGHT - MENU_PADDING),
    ),
  };

  const close = () => {
    onClose();
  };

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, fadeAnim, scaleAnim]);

  const handleClose = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.8,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => {
      close();
    });
  };

  useEffect(() => {
    setTimeout(() => handleClose(), 3000);
  }, [visible]);

  return { scaleAnim, fadeAnim, adjustedPosition };
};

export default useMessagePosition;
