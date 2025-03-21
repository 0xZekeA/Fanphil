import React from "react";
import { Text, View } from "react-native";
import useReceiptHooks from "../hooks/receipt.hooks";
import styles from "../styles";

const Summary = ({ salesId }: { salesId: string }) => {
  const { creditTotal, totalAmount, depositedAmount } =
    useReceiptHooks(salesId);

  return (
    <View style={styles.summary}>
      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>SUBTOTAL:</Text>
        <Text style={styles.summaryValue}>₦ {totalAmount.toFixed(2)}</Text>
      </View>
      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>DEPOSIT:</Text>
        <Text style={styles.summaryValue}>
          ₦ {Number(depositedAmount || "0").toFixed(2)}
        </Text>
      </View>
      {creditTotal > 0 && (
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>CHANGE:</Text>
          <Text style={styles.summaryValue}>₦ {creditTotal.toFixed(2)}</Text>
        </View>
      )}
      <View style={styles.summaryRow}>
        <Text style={[styles.summaryLabel, styles.totalLabel]}>TOTAL:</Text>
        <Text style={[styles.summaryValue, styles.totalValue]}>
          ₦ {totalAmount.toFixed(2)}
        </Text>
      </View>
    </View>
  );
};

export default Summary;
