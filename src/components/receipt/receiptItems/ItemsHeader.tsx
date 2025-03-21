import React from "react";
import { Text, View } from "react-native";
import styles from "../styles";

const ItemsHeader = () => {
  return (
    <View style={styles.itemsHeader}>
      <Text style={[styles.columnHeader, { flex: 2 }]}>Item</Text>
      <Text style={[styles.columnHeader, { flex: 1, textAlign: "center" }]}>
        Qty
      </Text>
      <Text style={[styles.columnHeader, { flex: 1.5, textAlign: "right" }]}>
        Price
      </Text>
    </View>
  );
};

export default ItemsHeader;
