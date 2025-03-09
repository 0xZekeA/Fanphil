import { COLORS } from "@/utils/colors";
import { Scale } from "@/utils/scaling";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

const ErrorAndForgotPassword: React.FC<{
  error?: string;
  showForgotPassword?: boolean;
  onForgotPasswordPress?: () => void;
}> = ({ error, showForgotPassword, onForgotPasswordPress }) => {
  return (
    <View
      style={{ marginTop: Scale.moderate(8) }}
      className="justify-between flex-row w-full"
    >
      {error && (
        <Text
          style={[styles.textXSmall, { color: COLORS.softCoral900 }]}
          className="font-Jakarta flex-1"
        >
          {error}
        </Text>
      )}
      {showForgotPassword && (
        <TouchableOpacity
          onPress={onForgotPasswordPress}
          className="items-end flex-1"
          style={{ marginRight: Scale.moderate(4) }}
        >
          <Text
            style={[styles.textSmall, { color: COLORS.blue600 }]}
            className="font-JakartaSemiBold text-sm"
          >
            Forgot password?
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ErrorAndForgotPassword;
