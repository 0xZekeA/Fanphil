import * as Haptics from "expo-haptics";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

type HapticType = "light" | "medium" | "heavy";

interface HapticButtonProps extends TouchableOpacityProps {
  onPress?: (...args: any[]) => void;
  hapticType?: HapticType;
}

const HapticButton: React.FC<HapticButtonProps> = ({
  children,
  onPress,
  hapticType = "light",
  ...props
}) => {
  const handlePress = (event: any) => {
    const impactStyle =
      hapticType === "light"
        ? Haptics.ImpactFeedbackStyle.Light
        : hapticType === "heavy"
          ? Haptics.ImpactFeedbackStyle.Heavy
          : Haptics.ImpactFeedbackStyle.Medium;

    Haptics.impactAsync(impactStyle);

    if (onPress) {
      onPress(event);
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} {...props}>
      {children}
    </TouchableOpacity>
  );
};

export default HapticButton;
