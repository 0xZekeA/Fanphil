import Modal from "@/components/Modal";
import React from "react";
import { View } from "react-native";
import Toast from "react-native-toast-message";
import { useCustomerForm } from "../hooks/CustomerFormProvider";
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
      <Toast />
    </Modal>
  );
};

export default ModalForm;
