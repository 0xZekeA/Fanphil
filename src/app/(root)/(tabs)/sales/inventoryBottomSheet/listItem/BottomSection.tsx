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
      Qty: {item.quantity} {"     "} Price: ₦{" "}
      {item.selling_price.toLocaleString()}
    </Text>
  );
};

export default BottomSection;
