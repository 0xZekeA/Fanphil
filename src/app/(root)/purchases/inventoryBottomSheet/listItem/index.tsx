import { Scale } from "@/utils/scaling";
import React from "react";
import { View } from "react-native";
import BottomSection from "./BottomSection";
import TopSection from "./TopSection";

const ListItem = ({ item }: { item: Inventory }) => {
  return (
    <View
      style={{ paddingVertical: Scale.moderate(12), rowGap: Scale.moderate(4) }}
    >
      <TopSection item={item} />
      <BottomSection item={item} />
    </View>
  );
};

export default ListItem;
