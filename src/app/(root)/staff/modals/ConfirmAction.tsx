import HapticButton from "@/components/HapticsButton";
import LongPressButton from "@/components/longPressButton";
import { COLORS } from "@/utils/colors";
import { Scale } from "@/utils/scaling";
import { ActivityIndicator, Text, View } from "react-native";
import { useMenuOptions } from "../hooks/MenuOptionsProvider";
import styles from "../styles/styles";

const ConfirmAction = ({ onClose }: { onClose: () => void }) => {
  const {
    action,
    isLoading: loading,
    modalHeaderText,
    isConfirmOption,
  } = useMenuOptions();

  return (
    isConfirmOption &&
    action && (
      <View>
        <View
          style={styles.confirmActionHeader}
          className="flex-col items-center"
        >
          <Text
            style={styles.textBase}
            className="font-JakartaMedium text-center"
          >
            {modalHeaderText}
          </Text>
        </View>
        {loading && <ActivityIndicator size="small" color="black" />}
        <View
          style={{ width: "100%", paddingHorizontal: Scale.moderate(24) }}
          className="flex-row items-center justify-between"
        >
          <HapticButton
            style={{ paddingLeft: Scale.moderate(20) }}
            onPress={onClose}
          >
            <Text
              style={[styles.textMed, { color: COLORS.gray400 }]}
              className={`font-Jakarta`}
            >
              Cancel
            </Text>
          </HapticButton>
          <LongPressButton
            closeModal={onClose}
            onLongPressComplete={action.onPress}
            text="Confirm"
            destructive={action.destructive ?? false}
          />
        </View>
      </View>
    )
  );
};

export default ConfirmAction;
