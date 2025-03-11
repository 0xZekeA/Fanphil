import { COLORS } from "@/utils/colors";
import React from "react";
import { Text, View } from "react-native";
import styles from "../../styles/styles";

const TopSection = ({ sale }: { sale: Sale }) => {
  const bgColor =
    (sale.synced_at || "").length > 1 ? COLORS.mint500 : COLORS.pastel200;

  return (
    <View className="flex-row justify-between items-center">
      <Text style={styles.textMed} className="font-JakartaLight">
        {sale.quantity ||
          1 +
            `${
              sale.quantity === 0 || sale.quantity === 1 ? "Item" : "Items"
            }`}{" "}
        - ₦{sale.total_price}
      </Text>
      <View
        style={[
          styles.syncedIndicator,
          {
            backgroundColor: bgColor,
          },
        ]}
      />
    </View>
  );
};

export default TopSection;
