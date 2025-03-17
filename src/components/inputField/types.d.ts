import { Control, RegisterOptions } from "react-hook-form";
import { StyleProp, TextInputProps, TextStyle } from "react-native";

declare interface BaseInputProps {
  placeholder?: string;
  icon?: any;
  iconRight?: any;
  error?: string;
  styling?: StyleProp<TextStyle>;
  secureTextEntry?: boolean;
  onBlur?: () => void;
  multiline?: boolean;
}

declare interface InputFieldProps extends BaseInputProps, TextInputProps {
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  control: Control<any>;
  name: string;
  rules?: RegisterOptions;
  explanation?: string;
  onExplanationPress?: () => void;
  error?: string;
  showForgotPassword?: boolean;
  onForgotPasswordPress?: () => void;
  updateMode?: boolean;
  hideEditButton?: boolean;
}
