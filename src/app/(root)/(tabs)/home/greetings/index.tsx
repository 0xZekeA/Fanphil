import React from "react";
import { View } from "react-native";
import styles from "../styles/styles";
import BottomSection from "./BottomSection";
import TopSection from "./TopSection";

const Greetings = () => {
  return (
    <View style={styles.greetingsContainer}>
      <TopSection />
      <BottomSection />
    </View>
  );
};

export default Greetings;
