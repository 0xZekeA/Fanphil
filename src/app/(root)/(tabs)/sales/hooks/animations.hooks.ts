import { useEffect, useRef, useState } from "react";
import { Animated, Easing } from "react-native";

const useAnimationsHooks = (isOwingFiltered: boolean) => {
  const slideAnim = useRef(new Animated.Value(-40)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [isVisible, setIsVisible] = useState(isOwingFiltered);

  useEffect(() => {
    if (isOwingFiltered) {
      setIsVisible(true);

      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -40,
          duration: 100,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start(() => {
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }).start();
      });
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -40,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => setIsVisible(false));
    }
  }, [fadeAnim, isOwingFiltered, slideAnim]);

  return { slideAnim, fadeAnim, isVisible };
};

export default useAnimationsHooks;
