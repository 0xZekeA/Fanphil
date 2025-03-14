import { icons } from "$root/constants/assets";
import React from "react";
import { Image, View } from "react-native";
import styles from "../../styles/styles";

const Chevron = () => {
  return (
    <View style={{ width: "100%" }} className="items-end">
      <Image source={icons.smallChevron} style={styles.iconStyle} />
    </View>
  );
};

export default Chevron;
