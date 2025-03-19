import Modal from "@/components/Modal";
import React from "react";
import { View } from "react-native";

import { useHistoryListProvider } from "../hooks/HistoryListProvider";
import styles from "../styles/styles";
import PurchasedItems from "./purchasedItems/index";

const PurchasedItemsModal = () => {
  const { selectedItem, onCloseModal } = useHistoryListProvider();

  return (
    <Modal isOpen={!!selectedItem} onClose={onCloseModal} withInput>
      <View
        style={styles.modalContainer}
        className="justify-center items-center"
      >
        <PurchasedItems onClose={onCloseModal} />
      </View>
    </Modal>
  );
};

export default PurchasedItemsModal;
