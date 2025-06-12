import { useInventoryProvider } from "@/providers/inventory/InventoryProvider";
import React, { memo } from "react";
import { Text, View } from "react-native";
import styles from "../../styles/styles";

const SoldListItems = ({ item }: { item: SoldItem }) => {
  const { inventoryMap } = useInventoryProvider();
  const name = inventoryMap.get(item.item_id)?.name || "Item";

  return (
    <View className="justify-between items-center flex-row">
      <Text style={styles.textMed} className="font-Jakarta">
        {name}
      </Text>
      <Text style={styles.textMed} className="font-JakartaMedium">
        {item.quantity}
      </Text>
    </View>
  );
};

export default memo(SoldListItems);
