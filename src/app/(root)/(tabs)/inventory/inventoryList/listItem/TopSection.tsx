import React from "react";
import { Text, View } from "react-native";
import { useInventoryListProvider } from "../../hooks/InventoryListProvider";
import styles from "../../styles/styles";

const TopSection = ({ item }: { item: Inventory }) => {
  const { getSyncedIndicatorColor, formatName, getSize } =
    useInventoryListProvider();

  const bgColor = getSyncedIndicatorColor(item);
  const name = formatName(item);
  const size = getSize(item);

  return (
    <View className="flex-row justify-between items-center">
      <Text style={styles.textMed} className="font-Jakarta">
        {name}
        <Text className="font-JakartaLight"> - {size}</Text>
      </Text>
      <View
        style={[
          styles.syncedIndicator,
          {
            backgroundColor: bgColor,
          },
        ]}
      />
    </View>
  );
};

export default TopSection;
