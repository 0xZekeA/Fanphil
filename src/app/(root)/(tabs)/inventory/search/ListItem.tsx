import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { useInventorySearchProvider } from "../hooks/InventorySearchProvider";
import styles from "../styles/styles";

const ListItem = ({ item }: { item: Inventory }) => {
  const { onPress } = useInventorySearchProvider();
  return (
    <TouchableOpacity
      style={styles.searchListItem}
      onPress={() => onPress(item)}
      className="flex-row justify-between items-center"
    >
      <Text style={styles.textSmall} className="font-Jakarta">
        {item.name}
        <Text style={styles.textSmall} className="font-JakartaLight">
          - {item.size}
          {item.unit}
        </Text>
      </Text>
      <Text style={styles.textSmall} className="font-JakartaExtraLight">
        {item.quantity}
      </Text>
    </TouchableOpacity>
  );
};

export default ListItem;
