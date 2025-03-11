import Modal from "@/components/Modal";
import React from "react";
import { View } from "react-native";

import { useMenuProvider } from "../hooks/MenuProvider";
import styles from "../styles/styles";
import ConfirmAction from "./ConfirmAction";

const ModalForm = () => {
  const { isConfirmOption, setIsConfirmOption } = useMenuProvider();

  return (
    <Modal isOpen={isConfirmOption} onClose={() => setIsConfirmOption(false)}>
      <View
        style={styles.modalContainer}
        className="justify-center items-center"
      >
        <ConfirmAction onClose={() => setIsConfirmOption(false)} />
      </View>
    </Modal>
  );
};

export default ModalForm;
