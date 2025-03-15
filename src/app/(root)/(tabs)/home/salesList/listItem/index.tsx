import HapticButton from "@/components/HapticsButton";
import { TabParamList } from "@/types/home.type";
import { MaterialTopTabNavigationProp } from "@react-navigation/material-top-tabs";
import { useNavigation } from "expo-router";
import React from "react";
import styles from "../../styles/styles";
import BottomSection from "./BottomSection";
import TopSection from "./TopSection";

const SalesItem = ({ sale }: { sale: Sale }) => {
  const navigation =
    useNavigation<MaterialTopTabNavigationProp<TabParamList>>();

  return (
    <HapticButton
      onPress={() => navigation.navigate("Sales")}
      style={styles.salesListItem}
    >
      <TopSection sale={sale} />
      <BottomSection sale={sale} />
    </HapticButton>
  );
};

export default SalesItem;
