import { COLORS } from "@/utils/colors";
import { Scale } from "@/utils/scaling";
import React from "react";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { usePurchasesFormProvider } from "../../providers/PurchasesFormProvider";

const RemoveItemBtn = ({ item }: { item: Inventory }) => {
  const { handleRemoveItem } = usePurchasesFormProvider();

  return (
    <TouchableOpacity
      style={{ padding: Scale.moderate(4) }}
      onPress={() => handleRemoveItem(item.id)}
    >
      <Icon name="close-outline" size={20} color={COLORS.gray500} />
    </TouchableOpacity>
  );
};

export default RemoveItemBtn;
