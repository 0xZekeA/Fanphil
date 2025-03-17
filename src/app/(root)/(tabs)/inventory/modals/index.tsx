import Modal from "@/components/Modal";
import React from "react";
import { View } from "react-native";

import { useMenuProvider } from "../hooks/MenuProvider";
import styles from "../styles/styles";
import ConfirmAction from "./ConfirmAction";
import RemoveAction from "./removeAction";

const ModalForm = () => {
  const {
    isConfirmOption,
    setIsConfirmOption,
    setIsRemoveOption,
    isRemoveOption,
  } = useMenuProvider();

  const onClose = () => {
    setIsConfirmOption(false);
    setIsRemoveOption(false);
  };

  return (
    <Modal isOpen={isConfirmOption || isRemoveOption} onClose={onClose}>
      <View
        style={styles.modalContainer}
        className="justify-center items-center"
      >
        <ConfirmAction onClose={onClose} />
        <RemoveAction onClose={onClose} />
      </View>
    </Modal>
  );
};

export default ModalForm;
