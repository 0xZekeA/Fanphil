import CustomButton from "@/components/customButton";
import InputField from "@/components/inputField";
import { COLORS } from "@/utils/colors";
import { Scale } from "@/utils/scaling";
import React from "react";
import { View } from "react-native";
import customerForm from "../../constants/form";
import { useCustomerForm } from "../../hooks/CustomerFormProvider";
import styles from "../../styles/styles";

const FormFields = () => {
  const { onSubmit, control, errors, isSubmitting } = useCustomerForm();

  return (
    <View style={styles.customerFormFields}>
      <View
        style={{
          rowGap: Scale.moderate(16),
          marginBottom: Scale.moderate(24),
        }}
      >
        {customerForm.map((details, index) => (
          <InputField
            key={index}
            name={details.id}
            label={details.label}
            labelStyle={{ color: COLORS.gray500 }}
            control={control}
            placeholder={details.placeholder}
            multiline={details.multiline ?? false}
            error={errors[details.id]?.message}
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
