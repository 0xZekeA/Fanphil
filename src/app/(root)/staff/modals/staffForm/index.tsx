import React from "react";
import { Pressable, ScrollView } from "react-native";
import { useStaffForms } from "../../providers/StaffFormProvider";
import styles from "../../styles/styles";
import FormFields from "./FormFields";
import FormHeader from "./FormHeader";

const StaffForm = () => {
  const { isFormDisplayed } = useStaffForms();

  return (
    isFormDisplayed && (
      <Pressable disabled style={styles.staffFormContentContainer}>
        <ScrollView>
          <FormHeader />
          <FormFields />
        </ScrollView>
      </Pressable>
    )
  );
};

export default StaffForm;
