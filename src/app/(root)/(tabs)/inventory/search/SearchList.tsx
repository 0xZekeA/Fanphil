import ListEmptyComp from "@/components/ListEmptyComp";
import React from "react";
import { FlatList } from "react-native";
import Animated from "react-native-reanimated";
import { useInventorySearchProvider } from "../providers/InventorySearchProvider";
import ListItem from "./ListItem";

const SearchList = () => {
  const { filteredInventoryItems, listStyle } = useInventorySearchProvider();

  return (
    <Animated.View style={listStyle}>
      <FlatList
        data={filteredInventoryItems}
        renderItem={({ item }) => <ListItem item={item} />}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <ListEmptyComp message="There seems to be nothing to search for" />
        }
      />
    </Animated.View>
  );
};

export default SearchList;
