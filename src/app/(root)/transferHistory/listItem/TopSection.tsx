import { formatDate } from "@/utils/formatDate";
import React from "react";
import { Text, View } from "react-native";
import useItemDetsHooks from "../hooks/itemDets.hooks";
import styles from "../styles/styles";

const TopSection = ({ item }: { item: InventoryTransfer | Return }) => {
  const { getTitle } = useItemDetsHooks();

  const title = getTitle(item);
  const date = formatDate(item.created_at);

  return (
    <View className="justify-between items-center flex-row">
      <Text style={styles.textMed} className="font-Jakarta">
        {title}
      </Text>
      <Text style={styles.textSmall} className="font-JakartaLight">
        {date}
      </Text>
    </View>
  );
};

export default TopSection;
