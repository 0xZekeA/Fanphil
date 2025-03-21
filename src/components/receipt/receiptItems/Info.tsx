import { formatItem } from "@/utils/getUsersName";
import { format } from "date-fns";
import React from "react";
import { Text, View } from "react-native";
import useReceiptHooks from "../hooks/receipt.hooks";
import styles from "../styles";

const Info = ({ salesId }: { salesId: string }) => {
  const { receiptNumber, selectedCustomer, sale } = useReceiptHooks(salesId);
  if (!selectedCustomer) return;

  return (
    <View style={styles.infoSection}>
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Date:</Text>
        <Text style={styles.infoValue}>
          {format(new Date(sale?.created_at || ""), "dd/MM/yyyy HH:mm")}
        </Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Receipt #:</Text>
        <Text style={styles.infoValue}>{receiptNumber}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Customer:</Text>
        <Text style={styles.infoValue}>
          {formatItem(selectedCustomer?.name) || "Walk-in Customer"}
        </Text>
      </View>
    </View>
  );
};

export default Info;
