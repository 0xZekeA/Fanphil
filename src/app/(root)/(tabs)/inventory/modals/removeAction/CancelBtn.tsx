import { COLORS } from "@/utils/colors";
import { Scale } from "@/utils/scaling";
import React from "react";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useRemoveItemsProvider } from "../../hooks/RemoveItemsProvider";

const CancelBtn = ({ item }: { item: Inventory }) => {
  const { resetRemovedQuantity } = useRemoveItemsProvider();

  return (
    <TouchableOpacity
      style={{ padding: Scale.moderate(4) }}
      onPress={resetRemovedQuantity}
    >
      <Icon name="close-outline" size={20} color={COLORS.gray500} />
    </TouchableOpacity>
  );
};

export default CancelBtn;
