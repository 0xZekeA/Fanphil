import Modal from "@/components/Modal";
import React from "react";
import { View } from "react-native";

import { useSalesDataProvider } from "../hooks/SalesDataProvider";
import styles from "../styles/styles";
import ConfirmAction from "./confirmAction/index";

const ModalForm = () => {
  const { selectedItem, setSelectedItem } = useSalesDataProvider();

  return (
    <Modal
      isOpen={!!selectedItem}
      onClose={() => setSelectedItem(null)}
      withInput
    >
      <View
        style={styles.modalContainer}
        className="justify-center items-center"
      >
        <ConfirmAction onClose={() => setSelectedItem(null)} />
      </View>
    </Modal>
  );
};

export default ModalForm;
