import { Scale } from "@/utils/scaling";
import React from "react";
import { Text, View } from "react-native";
import { useSellItemProvider } from "../../hooks/SellItemProvider";
import ItemAddComp from "../../inventoryBottomSheet/listItem/ItemAddComp";
import styles from "../../styles/styles";
import RemoveItemBtn from "./RemoveItemBtn";

const ListItemMain = ({ item }: { item: Inventory }) => {
  const { formatName, getSize } = useSellItemProvider();
  const name = formatName(item);
  const size = getSize(item);

  return (
    <View className="flex-row items-center justify-between">
      <Text style={styles.textMed} className="font-Jakarta">
        {name}
        <Text className="font-JakartaLight"> - {size}</Text>
      </Text>
      <View
        style={{ columnGap: Scale.moderate(16) }}
        className="flex-row items-center"
      >
        <ItemAddComp item={item} />
        <RemoveItemBtn item={item} />
      </View>
    </View>
  );
};

export default ListItemMain;
