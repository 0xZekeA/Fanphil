import LongPressButton from "@/components/longPressButton";
import { COLORS } from "@/utils/colors";
import { Scale } from "@/utils/scaling";
import { Text, TouchableOpacity, View } from "react-native";
import { useMenuProvider } from "../../providers/MenuProvider";
import { useRemoveItemsProvider } from "../../providers/RemoveItemsProvider";
import styles from "../../styles/styles";
import RemoveComp from "./RemoveComp";

const RemoveAction = ({ onClose }: { onClose: () => void }) => {
  const { isRemoveOption, contextMenu } = useMenuProvider();
  const { handleRemovedItems } = useRemoveItemsProvider();

  return (
    isRemoveOption && (
      <View>
        <View
          style={styles.confirmActionHeader}
          className="flex-col items-center"
        >
          <Text
            style={styles.textBase}
            className="font-JakartaMedium text-center"
          >
            Returns are usually reflected as a loss on the financial screen
          </Text>
        </View>
        <RemoveComp item={contextMenu.selectedItem} />
        <View
          style={{ width: "100%", paddingHorizontal: Scale.moderate(24) }}
          className="flex-row items-center justify-between"
        >
          <TouchableOpacity
            style={{ paddingLeft: Scale.moderate(20) }}
            onPress={onClose}
          >
            <Text
              style={[styles.textSmall, { color: COLORS.gray400 }]}
              className={`font-Jakarta`}
            >
              Cancel
            </Text>
          </TouchableOpacity>
          <LongPressButton
            closeModal={onClose}
            onLongPressComplete={handleRemovedItems}
            text="Confirm"
          />
        </View>
      </View>
    )
  );
};

export default RemoveAction;
