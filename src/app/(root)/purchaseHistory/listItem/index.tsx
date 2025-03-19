import React from "react";
import { TouchableOpacity, View } from "react-native";
import { useHistoryListProvider } from "../hooks/HistoryListProvider";
import styles from "../styles/styles";
import BottomSection from "./BottomSection";
import TopSection from "./TopSection";

const ListItem = ({ item }: { item: Purchase }) => {
  const { setSelectedItem } = useHistoryListProvider();

  const onPress = () => {
    setSelectedItem(item);
  };

  return (
    <TouchableOpacity style={styles.listItem} onPress={onPress}>
      <View style={styles.indicator} className="absolute" />
      <TopSection item={item} />
      <BottomSection item={item} />
    </TouchableOpacity>
  );
};

export default ListItem;
