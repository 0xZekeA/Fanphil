import { useInventoryProvider } from "@/providers/inventory/InventoryProvider";
import React from "react";
import { Text, View } from "react-native";
import styles from "../../styles/styles";

const SoldListItems = ({ item }: { item: SoldItem }) => {
  const { inventory } = useInventoryProvider();
  const name = inventory?.find((i) => i.id === item.item_id)?.name || "Item";

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

export default SoldListItems;
