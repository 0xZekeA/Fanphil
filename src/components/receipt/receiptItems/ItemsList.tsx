import { useInventoryProvider } from "@/providers/inventory/InventoryProvider";
import React from "react";
import { Text, View } from "react-native";
import styles from "../styles";

const ItemsList = ({ selectedItems }: { selectedItems: SoldItem[] }) => {
  const { inventory } = useInventoryProvider();

  return selectedItems
    .filter((item) => item.quantity > 0)
    .map((item) => {
      const inventoryItem = inventory?.find((inv) => inv.id === item.item_id);
      const itemPrice = inventoryItem ? inventoryItem.selling_price : 0;
      const itemTotal = itemPrice * item.quantity;
      if (!inventoryItem) return;

      return (
        <View key={item.id} style={styles.itemRow}>
          <View style={{ flex: 2 }}>
            <Text style={styles.itemName}>{inventoryItem.name}</Text>
            {inventoryItem?.unit && (
              <Text style={styles.itemDetail}>
                Unit: {inventoryItem.unit}, Size: {inventoryItem.size}
              </Text>
            )}
          </View>
          <Text style={{ flex: 1, textAlign: "center" }}>{item.quantity}</Text>
          <Text style={{ flex: 1.5, textAlign: "right" }}>
            ₦ {itemTotal.toFixed(2)}
          </Text>
        </View>
      );
    });
};

export default ItemsList;
