import CustomButton from "@/components/customButton";
import InputField from "@/components/inputField";
import { useAuthProvider } from "@/providers/auth";
import { COLORS } from "@/utils/colors";
import { Scale } from "@/utils/scaling";
import React from "react";
import { Text, View } from "react-native";
import inventoryForm from "../constants/form";
import { useInventoryFormProvider } from "../providers/InventoryFormProvider";
import styles from "../styles/styles";

const FormFields = () => {
  const { onSubmit, control, errors, isSubmitting } =
    useInventoryFormProvider();
  const { isAdmin } = useAuthProvider();

  return (
    <View style={styles.addInventoryItemsFields}>
      <View
        style={{
          rowGap: Scale.moderate(24),
          marginBottom: Scale.moderate(24),
        }}
      >
        {inventoryForm.map((details, index) => (
          <View key={index}>
            <Text
              style={[styles.textBase, { paddingLeft: Scale.moderate(8) }]}
              className="font-JakartaSemiBold"
            >
              {details.label}
            </Text>
            <InputField
              name={details.id}
              label={details.label}
              labelStyle={{ color: COLORS.gray500 }}
              control={control}
              placeholder={details.placeholder}
              error={errors[details.id]?.message}
              keyboardType={details.useNumberPad ? "numeric" : "default"}
              updateMode={details.isEditable || isAdmin}
              hideEditButton={details.isEditable === false}
            />
          </View>
        ))}
      </View>
      <CustomButton
        onPress={onSubmit}
        title={isSubmitting ? "Submitting..." : "Update"}
        disabled={isSubmitting}
      />
    </View>
  );
};

export default FormFields;
