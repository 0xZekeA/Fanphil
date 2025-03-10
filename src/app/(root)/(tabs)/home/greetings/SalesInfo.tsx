import { icons } from "$root/constants/assets";
import HapticButton from "@/components/HapticsButton";
import React from "react";
import { Image, Text } from "react-native";
import useSalesInfoHooks from "../hooks/salesInfo.hooks";
import styles from "../styles/styles";

const SalesInfo = () => {
  const { salesTotal } = useSalesInfoHooks();
  return (
    <HapticButton
      style={styles.salesInfoBtn}
      className="flex-row items-center justify-center"
    >
      <Image source={icons.trendLean} style={styles.icons} />
      <Text style={styles.textSmall} className="font-Jakarta">
        {salesTotal} sales, today
      </Text>
    </HapticButton>
  );
};

export default SalesInfo;
