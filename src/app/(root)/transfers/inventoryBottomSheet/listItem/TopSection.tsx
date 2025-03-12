import { Scale } from "@/utils/scaling";
import React from "react";
import { Text, View } from "react-native";
import { useTransferProvider } from "../../hooks/TransferProvider";
import styles from "../../styles/styles";
import ItemAddComp from "./ItemAddComp";

const TopSection = ({ item }: { item: Inventory }) => {
  const { formatName, getSize } = useTransferProvider();
  const name = formatName(item);
  const size = getSize(item);

  return (
    <View
      style={{ paddingHorizontal: Scale.moderate(8) }}
      className="flex-row justify-between items-center"
    >
      <Text style={styles.textMed} className="font-Jakarta">
        {name}
        <Text className="font-JakartaLight"> - {size}</Text>
      </Text>
      <ItemAddComp item={item} />
    </View>
  );
};

export default TopSection;
