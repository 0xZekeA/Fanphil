import {
  StyleProp,
  TextStyle,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";

declare interface ButtonProps extends TouchableOpacityProps {
  title: string;
  styling?: StyleProp<ViewStyle>;
  textStyling?: StyleProp<TextStyle>;
  className?: string;
  textClassName?: string;
  onPress?: () => void;
}
