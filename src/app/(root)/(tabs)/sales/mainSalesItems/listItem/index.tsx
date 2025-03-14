import React from "react";
import { TouchableOpacity } from "react-native";
import { useSalesDataProvider } from "../../hooks/SalesDataProvider";
import styles from "../../styles/styles";
import BottomSection from "./BottomSection";
import TopSection from "./TopSection";

const ListItem = ({ item }: { item: Sale }) => {
  const { onPress } = useSalesDataProvider();

  return (
    <TouchableOpacity
      style={styles.salesListItem}
      onPress={() => onPress(item)}
    >
      <TopSection item={item} />
      <BottomSection item={item} />
    </TouchableOpacity>
  );
};

export default ListItem;
