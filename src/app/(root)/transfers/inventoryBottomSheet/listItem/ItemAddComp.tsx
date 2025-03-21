import HapticButton from "@/components/HapticsButton";
import { Scale } from "@/utils/scaling";
import React from "react";
import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useTransferFormProvider } from "../../providers/TransferFormProvider";
import styles from "../../styles/styles";

const ItemAddComp = ({ item }: { item: Inventory }) => {
  const {
    stopHoldAction,
    startHoldAction,
    handleDecrease,
    handleIncrease,
    getItemQuantity,
  } = useTransferFormProvider();

  const qty = getItemQuantity(item.id);

  return (
    <View
      style={{ columnGap: Scale.moderate(16) }}
      className="flex-row items-center"
    >
      <HapticButton
        hapticType="medium"
        onLongPress={() => startHoldAction(item.id, "DECREASE")}
        onPressOut={stopHoldAction}
        onPress={() => handleDecrease(item.id)}
        style={{ padding: Scale.moderate(4) }}
      >
        <Icon name="remove-outline" size={20} color="#555" />
      </HapticButton>
      <Text style={styles.textLarge} className="font-JakartaLight">
        {qty}
      </Text>
      <HapticButton
        hapticType="medium"
        onLongPress={() => startHoldAction(item.id, "INCREASE")}
        onPressOut={stopHoldAction}
        onPress={() => handleIncrease(item.id)}
        style={{ padding: Scale.moderate(4) }}
      >
        <Icon name="add-outline" size={20} color="#555" />
      </HapticButton>
    </View>
  );
};

export default ItemAddComp;
