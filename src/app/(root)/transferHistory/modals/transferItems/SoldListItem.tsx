import { useInventoryProvider } from "@/providers/inventory/InventoryProvider";
import { ReturnItem } from "@/types/transferHistory";
import React from "react";
import { Text, View } from "react-native";
import styles from "../../styles/styles";

const SoldListItems = ({ item }: { item: TransferItem | ReturnItem }) => {
  const { inventory } = useInventoryProvider();
  const name =
    inventory?.find((i) => i.id === item.inventory_id)?.name || "Item";

  return (
    <View className="justify-between items-center flex-row">
      <Text style={styles.textMed} className="font-Jakarta">
        {name}
      </Text>
      <Text style={styles.textMed} className="font-JakartaMedium">
        {item.quantity_moved}
      </Text>
    </View>
  );
};

export default SoldListItems;
