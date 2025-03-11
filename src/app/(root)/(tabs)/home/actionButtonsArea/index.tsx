import { COLORS } from "@/utils/colors";
import { Scale } from "@/utils/scaling";
import React from "react";
import { View } from "react-native";
import Btn from "./Btn";
import SellersUpdateBar from "./SellersUpdateBar";

const ActionBtnArea = () => {
  return (
    <View style={{ rowGap: Scale.moderate(4) }}>
      <View
        style={{ columnGap: Scale.moderate(4) }}
        className="flex-row justify-between"
      >
        <Btn bgColor={COLORS.sky600} onPress={() => {}} title="Staff" />
        <Btn bgColor={COLORS.sky400} onPress={() => {}} title="Finances" />
      </View>
      <SellersUpdateBar />
    </View>
  );
};

export default ActionBtnArea;
