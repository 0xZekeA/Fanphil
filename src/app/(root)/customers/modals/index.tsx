import Modal from "@/components/Modal";
import React from "react";
import { View } from "react-native";
import { useCustomerForm } from "../providers/CustomerFormProvider";
import styles from "../styles/styles";
import StaffForm from "./customerForm";

const ModalForm = () => {
  const { setIsFormDisplayed, isFormDisplayed } = useCustomerForm();

  const isOpen = isFormDisplayed;
  const onClose = () => {
    setIsFormDisplayed(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} withInput={isFormDisplayed}>
      <View
        style={styles.modalContainer}
        className="justify-center items-center"
      >
        <StaffForm />
      </View>
    </Modal>
  );
};

export default ModalForm;
