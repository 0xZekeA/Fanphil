import Modal from "@/components/Modal";
import React from "react";
import { View } from "react-native";

import { useHistoryListProvider } from "../providers/HistoryListProvider";
import styles from "../styles/styles";
import TrfItems from "./transferItems";

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
        <TrfItems onClose={() => setSelectedItem(null)} />
      </View>
    </Modal>
  );
};

export default TransferItems;
