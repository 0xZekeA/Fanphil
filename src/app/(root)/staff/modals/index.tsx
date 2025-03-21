import CopyPopup from "@/components/Copied";
import Modal from "@/components/Modal";
import ViewMore from "@/components/viewMore";
import React from "react";
import { View } from "react-native";
import { useMenuOptions } from "../providers/MenuOptionsProvider";
import { useStaffForms } from "../providers/StaffFormProvider";
import { useStaffProviders } from "../providers/StaffProviders";
import styles from "../styles/styles";
import ConfirmAction from "./ConfirmAction";
import StaffForm from "./staffForm";

const ModalForm = () => {
  const { isViewMoreDisplayed, setIsViewMoreDisplayed, isSelected } =
    useStaffProviders();
  const { onModalClose, isModalOpen } = useMenuOptions();
  const { setIsFormDisplayed, isFormDisplayed } = useStaffForms();

  const isOpen = isModalOpen || isViewMoreDisplayed || isFormDisplayed;
  const onClose = () => {
    onModalClose();
    setIsFormDisplayed(false);
    setIsViewMoreDisplayed(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} withInput={isFormDisplayed}>
      <View
        style={styles.modalContainer}
        className="justify-center items-center"
      >
        <ConfirmAction onClose={onClose} />

        <StaffForm />
        {isSelected && (
          <ViewMore
            isDisplayed={isViewMoreDisplayed}
            onClose={onClose}
            data={isSelected}
          />
        )}
      </View>
      <CopyPopup />
    </Modal>
  );
};

export default ModalForm;
