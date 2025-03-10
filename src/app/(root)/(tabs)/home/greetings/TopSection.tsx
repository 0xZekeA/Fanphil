import { icons } from "$root/constants/assets";
import IconButton from "@/components/IconButton";
import React from "react";
import { View } from "react-native";
import SalesInfo from "./SalesInfo";

const TopSection = () => {
  return (
    <View className="items-center justify-between flex-row">
      <SalesInfo />
      <IconButton icon={icons.bell} onPress={() => null} />
    </View>
  );
};

export default TopSection;
