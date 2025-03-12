import { icons } from "$root/constants/assets";
import { COLORS } from "@/utils/colors";
import React from "react";
import { Image, Text, View } from "react-native";
import styles from "../styles/styles";

const BottomSection = ({ item }: { item: Inventory }) => {
  return (
    <View className="flex-row justify-between items-center">
      <Text
        style={[styles.textSmall, { color: COLORS.gray500 }]}
        className="font-JakartaLight"
      >
        Deleted at: {item.updated_at}
      </Text>
      <Image source={icons.smallChevron} style={styles.icons} />
    </View>
  );
};

export default BottomSection;
