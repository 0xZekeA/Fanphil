import { Scale } from "@/utils/scaling";
import React from "react";
import { Text, View } from "react-native";
import styles from "../styles/styles";
import Form from "./Form";

const ExpenseCard = () => {
  return (
    <View
      style={styles.expenseCardContainer}
      className="justify-center items-center"
    >
      <Text
        style={[styles.textXl, { marginBottom: Scale.moderate(24) }]}
        className="font-JakartaSemiBold"
      >
        Expense
      </Text>
      <Form />
    </View>
  );
};

export default ExpenseCard;
