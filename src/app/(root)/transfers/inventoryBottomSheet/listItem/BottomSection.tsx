import { Scale } from "@/utils/scaling";
import React from "react";
import { Text } from "react-native";
import styles from "../../styles/styles";

const BottomSection = ({ item }: { item: Inventory }) => {
  return (
    <Text
      style={[styles.textMed, { paddingHorizontal: Scale.moderate(8) }]}
      className="font-JakartaLight"
    >
      Qty at hand: {item.quantity}
    </Text>
  );
};

export default BottomSection;
