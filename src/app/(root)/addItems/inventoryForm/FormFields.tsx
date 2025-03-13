import CustomButton from "@/components/customButton";
import InputField from "@/components/inputField";
import { COLORS } from "@/utils/colors";
import { Scale } from "@/utils/scaling";
import React from "react";
import { View } from "react-native";
import inventoryForm from "../constants/form";
import { useInventoryFormProvider } from "../hooks/InventoryFormProvider";
import styles from "../styles/styles";

const FormFields = () => {
  const { onSubmit, control, errors, isSubmitting } =
    useInventoryFormProvider();

  return (
    <View style={styles.addInventoryItemsFields}>
      <View
        style={{
          rowGap: Scale.moderate(16),
          marginBottom: Scale.moderate(24),
        }}
      >
        {inventoryForm.map((details, index) => (
          <InputField
            key={index}
            name={details.id}
            label={details.label}
            labelStyle={{ color: COLORS.gray500 }}
            control={control}
            placeholder={details.placeholder}
            error={errors[details.id]?.message}
            keyboardType={details.useNumberPad ? "numeric" : "default"}
          />
        ))}
      </View>
      <CustomButton
        onPress={onSubmit}
        title={isSubmitting ? "Submitting..." : "Add"}
        disabled={isSubmitting}
      />
    </View>
  );
};

export default FormFields;
