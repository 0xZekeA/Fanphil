import React from "react";
import { TouchableOpacity } from "react-native";
import { usePopUpsProvider } from "../providers/PopUpsProvider";
import styles from "../styles/styles";
import BottomSection from "./BottomSection";
import TopSection from "./TopSection";

const ListItem = ({ item }: { item: Inventory }) => {
  const { showMessage, onOpen } = usePopUpsProvider();

  return (
    <TouchableOpacity
      style={styles.listItem}
      onLongPress={(event: any) => onOpen(item, event)}
      onPress={(event: any) => showMessage(event)}
    >
      <TopSection item={item} />
      <BottomSection item={item} />
    </TouchableOpacity>
  );
};

export default ListItem;
