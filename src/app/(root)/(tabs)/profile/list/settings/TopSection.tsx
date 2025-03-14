import { DataItem } from "@/types/profile";
import React from "react";
import { Image, Text, View } from "react-native";
import styles from "../../styles/styles";

const TopSection = ({ settings }: { settings: DataItem }) => {
  return (
    <View
      style={{ width: "100%" }}
      className="justify-between flex-row items-center"
    >
      <Text style={styles.textSmall} className="font-JakartaLight">
        {settings.name}
      </Text>
      <Image source={settings.icon} style={styles.iconStyle} />
    </View>
  );
};

export default TopSection;
