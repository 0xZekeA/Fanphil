import React from "react";
import { Text, View } from "react-native";
import OptionsButton from "../options/OptionsButton";
import styles from "../styles/styles";

const Header = () => {
  return (
    <View
      style={styles.pageHeader}
      className="items-center justify-between flex-row"
    >
      <Text style={styles.textXL} className="font-Jakarta">
        Inventory
      </Text>
      <OptionsButton />
    </View>
  );
};

export default Header;
