import HapticButton from "@/components/HapticsButton";
import { FilteredInventory } from "@/types/sellersInventory";
import { COLORS } from "@/utils/colors";
import { Scale } from "@/utils/scaling";
import React from "react";
import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import useQuantityControl from "../hooks/quantityControl.hooks";
import { useSellersInventoryListProvider } from "../providers/SellersInventoryListProvider";
import styles from "../styles/styles";

const ItemEditComp = ({ item }: { item: FilteredInventory }) => {
  const { quantity, setQuantity } = useSellersInventoryListProvider();

  const {
    handleIncrease,
    handleDecrease,
    startHoldAction,
    stopHoldAction,
    handleReset,
  } = useQuantityControl(item, quantity, setQuantity);

  return (
    <View
      style={{
        columnGap: Scale.moderate(24),
        paddingBottom: Scale.moderate(24),
        paddingHorizontal: Scale.moderate(32),
      }}
      className="flex-row items-center"
    >
      {/* Decrease Button */}
      <HapticButton
        hapticType="medium"
        onLongPress={() => startHoldAction("DECREASE")}
        onPressOut={stopHoldAction}
        onPress={handleDecrease}
        style={{ padding: Scale.moderate(4) }}
      >
        <Icon name="remove-outline" size={20} color={COLORS.gray600} />
      </HapticButton>

      {/* Quantity Display */}
      <Text style={styles.textLarge} className="font-JakartaLight">
        {quantity || "Done!"}
      </Text>

      {/* Increase Button */}
      <HapticButton
        hapticType="medium"
        onLongPress={() => startHoldAction("INCREASE")}
        onPressOut={stopHoldAction}
        onPress={handleIncrease}
        style={{ padding: Scale.moderate(4) }}
      >
        <Icon name="add-outline" size={20} color={COLORS.gray600} />
      </HapticButton>

      {/* Reset Button */}
      <HapticButton
        hapticType="medium"
        onPress={handleReset}
        style={{ padding: Scale.moderate(4), marginLeft: "auto" }}
      >
        <Icon name="refresh-outline" size={20} color={COLORS.gray600} />
      </HapticButton>
    </View>
  );
};

export default ItemEditComp;
