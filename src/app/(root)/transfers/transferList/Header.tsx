import { Scale } from "@/utils/scaling";
import React from "react";
import { View } from "react-native";
import ItemsTitle from "./ItemsTitle";
import Receiver from "./Receiver";

const Header = () => {
  return (
    <View style={{ rowGap: Scale.moderate(8) }}>
      <Receiver />
      <ItemsTitle />
    </View>
  );
};

export default Header;
