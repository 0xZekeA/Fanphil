import CustomButton from "@/components/customButton";
import InputField from "@/components/inputField";
import { COLORS } from "@/utils/colors";
import { Scale } from "@/utils/scaling";
import React from "react";
import { ActivityIndicator, Keyboard, Pressable, View } from "react-native";
import { useExpenseFormContext } from "../providers/ExpenseProviders";

const Form = () => {
  const { isSubmitting, control, onSubmit, errors } = useExpenseFormContext();

  return (
    <Pressable
      style={{ width: "100%", rowGap: Scale.moderate(24) }}
      className="items-center"
      onPress={Keyboard.dismiss}
    >
      <InputField
        name="reason"
        label="Reason"
        control={control}
        placeholder="Maintenance on 2 machines"
        error={errors.reason?.message}
        multiline
      />
      <InputField
        name="amount"
        label="Amount"
        control={control}
        placeholder="25680"
        keyboardType="numeric"
        error={errors.amount?.message}
      />
      <View className="gap-y-1 flex-col">
        {isSubmitting && <ActivityIndicator size="small" color="#000000" />}
        <CustomButton
          onPress={onSubmit}
          styling={{ backgroundColor: COLORS.softCoral700 }}
          title={isSubmitting ? "Submitting..." : "Submit"}
          disabled={isSubmitting}
        />
      </View>
    </Pressable>
  );
};

export default Form;
