import * as Haptics from "expo-haptics";
import { useRef, useState } from "react";
import { Animated, Easing } from "react-native";

const useAnimations = () => {
  const animation = useRef(new Animated.Value(0)).current;
  const [isPressing, setIsPressing] = useState(false);

  const startAnimation = (
    onLongPressComplete: () => void,
    closeModal: (set: boolean) => void,
  ) => {
    setIsPressing(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    animation.setValue(0);
    Animated.timing(animation, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        onLongPressComplete();
        closeModal(false);
      }
    });
  };

  const stopAnimation = () => {
    setIsPressing(false);
    Animated.timing(animation, {
      toValue: 0,
      duration: 200,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  };

  return { isPressing, animation, startAnimation, stopAnimation };
};

export default useAnimations;
