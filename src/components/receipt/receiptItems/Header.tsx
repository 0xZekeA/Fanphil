import React from "react";
import { Text, View } from "react-native";
import { dets } from "../details";
import styles from "../styles";

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.businessName}>{dets.businessName}</Text>
      <Text style={styles.businessInfo}>{dets.businessAddress}</Text>
      <Text style={styles.businessInfo}>Tel: {dets.businessPhone}</Text>
    </View>
  );
};

export default Header;
