import CustomButton from "@/components/customButton";
import Field from "@/components/inputField/Field";
import { Scale } from "@/utils/scaling";
import React from "react";
import { Text, View } from "react-native";
import { useSellItemFormProvider } from "../providers/sellForm/SellItemFormProvider";
import styles from "../styles/styles";

const SubmitArea = () => {
  const {
    submitSale,
    selectedItems,
    depositedAmount,
    handleChange,
    error,
    total,
  } = useSellItemFormProvider();
  return (
    (selectedItems || []).length > 0 && (
      <View
        style={{ rowGap: Scale.moderate(24), marginTop: Scale.moderate(80) }}
      >
        <View className="flex-row justify-between items-center">
          <Text style={styles.textBase} className="font-JakartaMedium">
            Total:
          </Text>
          <Text style={styles.textBase} className="font-JakartaSemiBold">
            ₦ {total.toLocaleString()}
          </Text>
        </View>
        <View
          style={{ rowGap: Scale.moderate(8) }}
          className="flex-row justify-between items-start"
        >
          <Text style={[styles.textBase]} className={` font-JakartaMedium`}>
            Initial Deposit:
          </Text>

          <View style={{ width: "60%" }}>
            <Field
              value={depositedAmount}
              onChangeText={handleChange}
              error={error ?? ""}
              placeholder="100000"
              keyboardType="number-pad"
            />
          </View>
        </View>
        <View className="items-center">
          <CustomButton
            styling={{ width: "60%" }}
            title="Submit"
            onPress={submitSale}
          />
        </View>
      </View>
    )
  );
};

export default SubmitArea;
