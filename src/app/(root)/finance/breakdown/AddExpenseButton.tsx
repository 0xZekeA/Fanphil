import CustomButton from "@/components/customButton";
import { COLORS } from "@/utils/colors";
import { Scale } from "@/utils/scaling";
import React from "react";
import { Dimensions, View } from "react-native";
import { useExpenseFormContext } from "../hooks/ExpenseProviders";

const { width } = Dimensions.get("screen");

const AddExpenseButton = () => {
  const { setIsExpenseModalOpen, isSubmitting } = useExpenseFormContext();

  return (
    <View
      style={{ marginVertical: Scale.moderate(48) }}
      className="items-center"
    >
      <CustomButton
        title={isSubmitting ? "Adding Expense..." : "Add Expense"}
        onPress={() => setIsExpenseModalOpen(true)}
        styling={{ backgroundColor: COLORS.softCoral700, width: width * 0.6 }}
      />
    </View>
  );
};

export default AddExpenseButton;
