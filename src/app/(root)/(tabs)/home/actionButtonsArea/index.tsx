import { COLORS } from "@/utils/colors";
import { Scale } from "@/utils/scaling";
import { router } from "expo-router";
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
        <Btn
          bgColor={COLORS.sky600}
          onPress={() => router.push("/(root)/staff")}
          title="Staff"
        />
        <Btn
          bgColor={COLORS.sky400}
          onPress={() => router.push("/(root)/finance")}
          title="Finances"
        />
      </View>
      <SellersUpdateBar />
    </View>
  );
};

export default ActionBtnArea;
