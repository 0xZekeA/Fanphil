import Modal from "@/components/Modal";
import React from "react";
import { View } from "react-native";

import { useHistoryListProvider } from "../hooks/HistoryListProvider";
import styles from "../styles/styles";
import ConfirmAction from "./transferItems/index";

const TransferItems = () => {
  const { selectedItem, setSelectedItem } = useHistoryListProvider();

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

export default TransferItems;
