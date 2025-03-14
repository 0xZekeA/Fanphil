import { Scale } from "@/utils/scaling";
import React from "react";
import { Text, View } from "react-native";
import styles from "../styles/styles";

const Header = () => {
  return (
    <View style={{ marginBottom: Scale.moderate(32) }} className="items-center">
      <Text style={styles.textBase} className="font-JakartaMedium">
        Expenses
      </Text>
    </View>
  );
};

export default Header;
