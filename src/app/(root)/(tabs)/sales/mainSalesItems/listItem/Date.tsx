import { formatDate } from "@/utils/formatDate";
import React from "react";
import { Text, View } from "react-native";
import styles from "../../styles/styles";

const Date = ({ item }: { item: Sale }) => {
  const date = formatDate(item.created_at);

  return (
    <View style={styles.dateContainer}>
      <Text style={styles.textMed} className="font-JakartaSemiBold">
        {date}
      </Text>
    </View>
  );
};

export default Date;
