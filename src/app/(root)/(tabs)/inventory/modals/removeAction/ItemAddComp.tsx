import HapticButton from "@/components/HapticsButton";
import { Scale } from "@/utils/scaling";
import React from "react";
import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import { useRemoveItemsProvider } from "../../providers/RemoveItemsProvider";
import styles from "../../styles/styles";

const ItemAddComp = () => {
  const {
    stopHoldAction,
    startHoldAction,
    handleDecrease,
    handleIncrease,
    removedQuantity,
  } = useRemoveItemsProvider();

  return (
    <View
      style={{ columnGap: Scale.moderate(16) }}
      className="flex-row items-center"
    >
      <HapticButton
        hapticType="medium"
        onLongPress={() => startHoldAction("DECREASE")}
        onPressOut={stopHoldAction}
        onPress={handleDecrease}
        style={{
          padding: Scale.moderate(4),
          opacity: removedQuantity ? 1 : 0,
        }}
      >
        <Icon name="remove-outline" size={20} color="#555" />
      </HapticButton>

      <Text style={styles.textLarge} className="font-JakartaLight">
        {removedQuantity}
      </Text>

      <HapticButton
        hapticType="medium"
        onLongPress={() => startHoldAction("INCREASE")}
        onPressOut={stopHoldAction}
        onPress={handleIncrease}
        style={{ padding: Scale.moderate(4) }}
      >
        <Icon name="add-outline" size={20} color="#555" />
      </HapticButton>
    </View>
  );
};

export default ItemAddComp;
