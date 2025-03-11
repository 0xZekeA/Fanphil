import { icons } from "$root/constants/assets";
import { COLORS } from "@/utils/colors";
import { formatDate } from "@/utils/formatDate";
import React from "react";
import { Image, Text, View } from "react-native";
import styles from "../../styles/styles";

const BottomSection = ({ sale }: { sale: Sale }) => {
  const createdAt = formatDate(sale.created_at);
  return (
    <View className="flex-row justify-between items-center">
      <Text
        style={[styles.textSmall, { color: COLORS.gray500 }]}
        className="font-JakartaLight"
      >
        {createdAt}
      </Text>
      <Image source={icons.smallChevron} style={styles.icons} />
    </View>
  );
};

export default BottomSection;
