import Modal from "@/components/Modal";
import React from "react";
import { View } from "react-native";

import { useSellersInventoryListProvider } from "../providers/SellersInventoryListProvider";
import styles from "../styles/styles";
import ConfirmAction from "./ConfirmAction";

const ModalForm = () => {
  const { currentItem, setCurrentItem } = useSellersInventoryListProvider();

  return (
    <Modal isOpen={!!currentItem} onClose={() => setCurrentItem(null)}>
      <View
        style={styles.modalContainer}
        className="justify-center items-center"
      >
        <ConfirmAction onClose={() => setCurrentItem(null)} />
      </View>
    </Modal>
  );
};

export default ModalForm;
