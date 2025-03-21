import ListEmptyComp from "@/components/ListEmptyComp";
import { useInventoryProvider } from "@/providers/inventory/InventoryProvider";
import React from "react";
import { FlatList, View } from "react-native";

import BottomSheetHeader from "./BottomSheetHeader";
import ListItem from "./listItem";

const List = () => {
  const { filteredInventory } = useInventoryProvider();

  return (
    <FlatList
      data={filteredInventory}
      renderItem={({ item }) => <ListItem item={item} />}
      keyExtractor={(_, index) => index.toString()}
      ListHeaderComponent={<BottomSheetHeader />}
      ListEmptyComponent={
        <ListEmptyComp message="There seems to be no available inventory item" />
      }
      ListFooterComponent={<View style={{ paddingBottom: 120 }} />}
    />
  );
};

export default List;
