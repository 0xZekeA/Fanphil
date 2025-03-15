import { useAuthProvider } from "@/providers/auth";
import { TabParamList } from "@/types/home.type";
import { COLORS } from "@/utils/colors";
import { Scale } from "@/utils/scaling";
import { MaterialTopTabNavigationProp } from "@react-navigation/material-top-tabs";
import { router, useNavigation } from "expo-router";
import React from "react";
import { View } from "react-native";
import Btn from "./Btn";
import SellersUpdateBar from "./SellersUpdateBar";

const ActionBtnArea = () => {
  const { isAdmin } = useAuthProvider();
  const navigation =
    useNavigation<MaterialTopTabNavigationProp<TabParamList>>();

  const onPress = () => {
    if (isAdmin) {
      return router.push("/(root)/finance");
    }
    return navigation.navigate("Inventory");
  };

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
          onPress={onPress}
          title={isAdmin ? "Finances" : "Add Items"}
        />
      </View>
      <SellersUpdateBar />
    </View>
  );
};

export default ActionBtnArea;
