import React, { createContext, useContext, useRef, useState } from "react";
import { Animated } from "react-native";

const CopyAnimationContext = createContext<
  CopyAnimationContextType | undefined
>(undefined);

const CopyAnimationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [visible, setVisible] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const callCopyAnimation = () => {
    setVisible(true);

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => setVisible(false));
    }, 1500);
  };

  return (
    <CopyAnimationContext.Provider
      value={{ callCopyAnimation, fadeAnim, visible }}
    >
      {children}
    </CopyAnimationContext.Provider>
  );
};

export default CopyAnimationProvider;

export const useCopyAnimation = () => {
  const context = useContext(CopyAnimationContext);
  if (!context) {
    throw new Error(
      "useCopyAnimation must be used within a CopyAnimationProvider",
    );
  }
  return context;
};
