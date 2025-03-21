import { FilteredInventory } from "@/types/sellersInventory";
import React from "react";
import { TouchableOpacity } from "react-native";
import { useSellersInventoryListProvider } from "../../providers/SellersInventoryListProvider";
import styles from "../../styles/styles";
import BottomSection from "./BottomSection";
import TopSection from "./TopSection";

const ListItem = ({ item }: { item: FilteredInventory }) => {
  const { onPress } = useSellersInventoryListProvider();

  return (
    <TouchableOpacity
      style={styles.inventoryListItem}
      onPress={() => onPress(item)}
    >
      <TopSection item={item} />
      <BottomSection item={item} />
    </TouchableOpacity>
  );
};

export default ListItem;
