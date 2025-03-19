import { Scale } from "@/utils/scaling";
import React from "react";
import { View } from "react-native";
import ItemsTitle from "./ItemsTitle";

const Header = () => {
  return (
    <View style={{ rowGap: Scale.moderate(8) }}>
      <ItemsTitle />
    </View>
  );
};

export default Header;
