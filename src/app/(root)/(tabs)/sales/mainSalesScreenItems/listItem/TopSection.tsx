import React from "react";
import { Text, View } from "react-native";
import { useSalesDataProvider } from "../../providers/SalesDataProvider";
import styles from "../../styles/styles";

const TopSection = ({ item }: { item: Sale }) => {
  const { getStatus, formatName } = useSalesDataProvider();

  const status = getStatus(item);
  const name = formatName(item);

  return (
    <View className="flex-row justify-between items-center">
      <Text style={styles.textMed} className="font-JakartaLight">
        {name}
      </Text>
      <Text
        style={[styles.textXS, { color: status.color }]}
        className="font-Jakarta"
      >
        {status.message}
      </Text>
    </View>
  );
};

export default TopSection;
