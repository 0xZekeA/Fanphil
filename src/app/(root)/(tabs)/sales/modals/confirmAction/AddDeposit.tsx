import Field from "@/components/inputField/Field";
import { Scale } from "@/utils/scaling";
import React from "react";
import { Text, View } from "react-native";
import { useSalesDataProvider } from "../../hooks/SalesDataProvider";
import { useSellItemFormProvider } from "../../hooks/SellItemFormProvider";
import styles from "../../styles/styles";

const AddDeposit = ({ item }: { item: Sale }) => {
  const { addedDeposit } = useSalesDataProvider();
  const { handleChange, error } = useSellItemFormProvider();

  return (
    <View
      style={{
        rowGap: Scale.moderate(16),
        paddingVertical: Scale.moderate(24),
      }}
    >
      <View className="flex-row justify-between items-center">
        <Text style={styles.textBase} className="font-JakartaMedium">
          Total:
        </Text>
        <Text style={styles.textBase} className="font-JakartaSemiBold">
          ₦ {item.deposit.toLocaleString()}
        </Text>
      </View>
      <View className="flex-row justify-between items-start">
        <Text style={[styles.textBase]} className={` font-JakartaMedium`}>
          Add Deposit:
        </Text>

        <View style={{ width: "60%" }}>
          <Field
            value={addedDeposit}
            onChangeText={(value: string) => handleChange(value, true, item)}
            error={error || ""}
            placeholder="100000"
            keyboardType="numbers-and-punctuation"
          />
        </View>
      </View>
    </View>
  );
};

export default AddDeposit;
