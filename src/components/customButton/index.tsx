import { Text } from "react-native";
import HapticButton from "../HapticsButton";
import { ButtonProps } from "./customBtn.types";
import styles from "./styles";

const CustomButton = ({
  onPress,
  title,
  className,
  textClassName,
  textStyling,
  styling,
  ...props
}: ButtonProps) => (
  <HapticButton
    onPress={onPress}
    style={[styles.btn, styling]}
    className={`flex-row justify-center items-center ${className}`}
    {...props}
  >
    <Text
      style={[styles.text, textStyling]}
      className={`font-JakartaSemiBold ${textClassName}`}
    >
      {title}
    </Text>
  </HapticButton>
);

export default CustomButton;
