import HapticButton from "@/components/HapticsButton";
import { TabParamList } from "@/types/home.type";
import { COLORS } from "@/utils/colors";
import { Scale } from "@/utils/scaling";
import { MaterialTopTabNavigationProp } from "@react-navigation/material-top-tabs";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, View } from "react-native";
import styles from "../styles/styles";

const Header = () => {
  const navigation =
    useNavigation<MaterialTopTabNavigationProp<TabParamList>>();

  return (
    <View
      style={{
        marginBottom: Scale.moderate(16),
        marginTop: Scale.moderate(32),
        paddingHorizontal: Scale.moderate(24),
      }}
      className="justify-between items-center flex-row"
    >
      <Text style={styles.textBase} className="font-JakartaMedium">
        Recent Sales
      </Text>

      <HapticButton onPress={() => navigation.navigate("Sales")}>
        <Text
          style={[styles.textSmall, { color: COLORS.indigo900 }]}
          className="font-JakartaLight"
        >
          Show All
        </Text>
      </HapticButton>
    </View>
  );
};

export default Header;
