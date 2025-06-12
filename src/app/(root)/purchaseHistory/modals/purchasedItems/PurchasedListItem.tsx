import { useInventoryProvider } from "@/providers/inventory/InventoryProvider";
import React from "react";
import { Text, View } from "react-native";
import styles from "../../styles/styles";

const PurchasedListItem = ({ item }: { item: PurchasedItem }) => {
  const { inventoryMap } = useInventoryProvider();
  const name = inventoryMap.get(item.inventory_id || "")?.name || "Item";

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

export default PurchasedListItem;
