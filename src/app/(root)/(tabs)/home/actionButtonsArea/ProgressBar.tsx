import React from "react";
import { Text, View } from "react-native";
import useProgressbarHooks from "../hooks/progressbar.hooks";
import styles from "../styles/styles";

const ProgressBar = () => {
  const { percentage, is100 } = useProgressbarHooks();
  return is100 ? (
    <Text
      style={[styles.textSmall, { width: "100%" }]}
      className="font-JakartaLight"
    >
      Inventory items sold out
    </Text>
  ) : (
    <View style={styles.progressContainer}>
      <View
        style={[
          styles.ProgressBar,
          {
            width: `${percentage}%`,
          },
        ]}
      />
    </View>
  );
};

export default ProgressBar;
