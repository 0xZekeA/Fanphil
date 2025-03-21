import React from "react";
import { TouchableOpacity } from "react-native";
import { useInventoryListProvider } from "../../providers/InventoryListProvider";
import { useMenuProvider } from "../../providers/MenuProvider";
import styles from "../../styles/styles";
import BottomSection from "./BottomSection";
import TopSection from "./TopSection";

const ListItem = ({ item }: { item: Inventory }) => {
  const { onPress } = useInventoryListProvider();
  const { onOpenMenuItems } = useMenuProvider();

  return (
    <TouchableOpacity
      style={styles.inventoryListItem}
      onLongPress={(event: any) => onOpenMenuItems(item, event)}
      onPress={() => onPress(item)}
    >
      <TopSection item={item} />
      <BottomSection item={item} />
    </TouchableOpacity>
  );
};

export default ListItem;
