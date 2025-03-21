import React from "react";
import { Pressable, ScrollView } from "react-native";
import { useCustomerForm } from "../../providers/CustomerFormProvider";
import styles from "../../styles/styles";
import FormFields from "./FormFields";
import FormHeader from "./FormHeader";

const StaffForm = () => {
  const { isFormDisplayed } = useCustomerForm();

  return (
    isFormDisplayed && (
      <Pressable disabled style={styles.customerFormContentContainer}>
        <ScrollView>
          <FormHeader />
          <FormFields />
        </ScrollView>
      </Pressable>
    )
  );
};

export default StaffForm;
