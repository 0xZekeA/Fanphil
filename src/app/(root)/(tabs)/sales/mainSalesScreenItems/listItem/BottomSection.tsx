import { icons } from "$root/constants/assets";
import { COLORS } from "@/utils/colors";
import React from "react";
import { Image, Text, View } from "react-native";
import styles from "../../styles/styles";

const BottomSection = ({ item }: { item: Sale }) => {
  return (
    <View className="flex-row justify-between items-center">
      <Text
        style={[styles.textMed, { color: COLORS.gray500 }]}
        className="font-JakartaLight"
      >
        x{item.quantity} {"    "} ₦ {item.total_price.toLocaleString()}
      </Text>
      <Image source={icons.smallChevron} style={styles.icons} />
    </View>
  );
};

export default BottomSection;
