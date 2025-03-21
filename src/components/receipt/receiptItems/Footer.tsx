import React from "react";
import { Text, View } from "react-native";
import styles from "../styles";

const Footer = () => {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>Thank you for your purchase!</Text>
      <Text style={styles.footerText}>See you soon!</Text>
    </View>
  );
};

export default Footer;
