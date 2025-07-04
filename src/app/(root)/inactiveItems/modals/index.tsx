import Modal from "@/components/Modal";
import React from "react";
import { View } from "react-native";
import { usePopUpsProvider } from "../providers/PopUpsProvider";
import styles from "../styles/styles";
import ConfirmAction from "./ConfirmAction";

const ModalForm = () => {
  const { isConfirmOption, setIsConfirmOption } = usePopUpsProvider();

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
