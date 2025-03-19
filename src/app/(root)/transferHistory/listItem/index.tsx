import React from "react";
import { TouchableOpacity, View } from "react-native";
import { useHistoryListProvider } from "../hooks/HistoryListProvider";
import useItemDetsHooks from "../hooks/itemDets.hooks";
import styles from "../styles/styles";
import BottomSection from "./BottomSection";
import TopSection from "./TopSection";

const ListItem = ({ item }: { item: InventoryTransfer | Return }) => {
  const { getColor } = useItemDetsHooks();
  const { setSelectedItem } = useHistoryListProvider();

  const onPress = () => {
    setSelectedItem(item);
  };

  const color = getColor(item);

  return (
    <TouchableOpacity style={styles.listItem} onPress={onPress}>
      <View
        style={[styles.indicator, { backgroundColor: color }]}
        className="absolute"
      />
      <TopSection item={item} />
      <BottomSection item={item} />
    </TouchableOpacity>
  );
};

export default ListItem;
