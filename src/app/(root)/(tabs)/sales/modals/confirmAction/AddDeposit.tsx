import Field from "@/components/inputField/Field";
import { COLORS } from "@/utils/colors";
import { Scale } from "@/utils/scaling";
import React from "react";
import { Text, View } from "react-native";
import { useSalesDataProvider } from "../../providers/SalesDataProvider";
import { useSellItemFormProvider } from "../../providers/sellForm/SellItemFormProvider";
import styles from "../../styles/styles";

const AddDeposit = ({ item }: { item: Sale }) => {
  const { addedDeposit } = useSalesDataProvider();
  const { handleChange, error } = useSellItemFormProvider();
  const difference = item.total_price - item.deposit;

  return (
    <View
      style={{
        rowGap: Scale.moderate(16),
        paddingBottom: Scale.moderate(24),
      }}
    >
      <View className="flex-row justify-between items-center">
        <Text style={styles.textBase} className="font-JakartaMedium">
          Paid amount:
        </Text>
        <Text style={styles.textBase} className="font-JakartaSemiBold">
          ₦ {item.deposit.toLocaleString()}
        </Text>
      </View>
      <View className="flex-row justify-between items-center">
        <Text style={styles.textBase} className="font-JakartaMedium">
          Amount Left:
        </Text>
        <Text style={styles.textBase} className="font-JakartaSemiBold">
          ₦ {difference.toLocaleString()}
        </Text>
      </View>
      <View className="flex-row justify-between items-start">
        <Text style={[styles.textBase]} className={` font-JakartaMedium`}>
          Add Deposit:
        </Text>
        {difference < 1 ? (
          <Text
            style={[styles.textMed, { color: COLORS.gray600 }]}
            className={` font-JakartaMedium`}
          >
            Paid off
          </Text>
        ) : (
          <View style={{ width: "60%" }}>
            <Field
              value={addedDeposit}
              onChangeText={(value: string) => handleChange(value, true, item)}
              error={error || ""}
              placeholder="100000"
              keyboardType="numbers-and-punctuation"
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default AddDeposit;
