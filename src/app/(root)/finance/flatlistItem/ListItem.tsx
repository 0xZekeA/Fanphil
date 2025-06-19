import { ListItemProps } from "@/types/finances.types";
import { COLORS } from "@/utils/colors";
import React from "react";
import { Text, View } from "react-native";
import styles from "../styles/styles";

const FinancesData = ({ item }: { item: ListItemProps }) => {
  const color = item.notCash
    ? COLORS.gray400
    : item.profit
    ? COLORS.mint500
    : COLORS.softCoral700;
  const amount = item.notCash
    ? item.later
    : item.later?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") ?? "0";

  return (
    <View style={styles.listItemContainer} className="flex-row justify-between">
      <Text style={styles.textSmallBit} className="font-JakartaSemiBold">
        {item.initial}
      </Text>
      <Text
        style={[styles.textXs, { color: color }]}
        className={`font-JakartaMedium `}
      >
        {!item.profit && !item.notCash ? "-" : ""}
        {item.notCash ? "" : "₦"}
        {amount}
      </Text>
    </View>
  );
};

export default FinancesData;
