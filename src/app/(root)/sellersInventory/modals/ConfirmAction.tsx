import LongPressButton from "@/components/longPressButton";
import { COLORS } from "@/utils/colors";
import { Scale } from "@/utils/scaling";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { useSellersInventoryListProvider } from "../hooks/SellersInventoryListProvider";
import styles from "../styles/styles";
import ItemEditComp from "./ItemEditComp";

const ConfirmAction = ({ onClose }: { onClose: () => void }) => {
  const { currentItem, handleUpdate, loading, quantity } =
    useSellersInventoryListProvider();

  if (!currentItem || !quantity) return null;

  return (
    <View>
      <View
        style={styles.confirmActionHeader}
        className="flex-col items-center"
      >
        <Text
          style={styles.textLarge}
          className="font-JakartaMedium text-center"
        >
          Edit Sellers Inventory
        </Text>
        <Text style={styles.textMed} className="font-JakartaMedium text-center">
          It is advised this operation only be done if there's a mistake
        </Text>
      </View>
      <ItemEditComp item={currentItem} />
      {loading && <ActivityIndicator size="small" color="black" />}
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
          onLongPressComplete={() => handleUpdate(quantity)}
          text="Confirm"
          destructive
        />
      </View>
    </View>
  );
};

export default ConfirmAction;
