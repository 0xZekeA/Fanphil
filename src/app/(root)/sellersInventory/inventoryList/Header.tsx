import BackButton from "@/components/BackButton";
import { Scale } from "@/utils/scaling";
import React from "react";
import { View } from "react-native";
import SellerSelector from "./SellerSelector";

const Header = () => {
  return (
    <View style={{ rowGap: Scale.moderate(24) }}>
      <BackButton title="Drivers Inventory" />
      <SellerSelector />
    </View>
  );
};

export default Header;
