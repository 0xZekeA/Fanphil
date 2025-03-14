import React from "react";
import { Text, View } from "react-native";
import useSalesCountHooks from "../hooks/salesCount.hooks";
import styles from "../styles/styles";

const OrderCount = () => {
  const { salesCount } = useSalesCountHooks();

  return (
    <View>
      <Text style={styles.textSmall} className="font-Jakarta">
        {salesCount}
      </Text>
    </View>
  );
};

export default OrderCount;
