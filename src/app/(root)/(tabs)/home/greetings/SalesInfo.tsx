import { icons } from "$root/constants/assets";
import HapticButton from "@/components/HapticsButton";
import { TabParamList } from "@/types/home.type";
import { MaterialTopTabNavigationProp } from "@react-navigation/material-top-tabs";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, Text } from "react-native";
import useSalesInfoHooks from "../hooks/salesInfo.hooks";
import styles from "../styles/styles";

const SalesInfo = () => {
  const { salesTotal } = useSalesInfoHooks();

  const navigation =
    useNavigation<MaterialTopTabNavigationProp<TabParamList>>();

  return (
    <HapticButton
      style={styles.salesInfoBtn}
      className="flex-row items-center justify-center"
      onPress={() => navigation.navigate("Sales")}
    >
      <Image source={icons.trendLean} style={styles.icons} />
      <Text style={styles.textSmall} className="font-Jakarta">
        {salesTotal} {salesTotal === 1 ? "sale" : "sales"}, today
      </Text>
    </HapticButton>
  );
};

export default SalesInfo;
