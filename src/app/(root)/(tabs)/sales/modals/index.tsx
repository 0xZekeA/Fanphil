import Modal from "@/components/Modal";
import Receipt from "@/components/receipt";
import React from "react";
import { View } from "react-native";
import { useMenuProvider } from "../providers/MenuProvider";
import { useSalesDataProvider } from "../providers/SalesDataProvider";
import { useSellItemFormProvider } from "../providers/sellForm/SellItemFormProvider";
import styles from "../styles/styles";
import ConfirmAction from "./confirmAction/index";

const ModalForm = () => {
  const { selectedItem, setSelectedItem } = useSalesDataProvider();
  const { isReceiptShown, setIsReceiptShown, salesId } =
    useSellItemFormProvider();
  const { contextMenu } = useMenuProvider();

  const onClose = () => {
    setSelectedItem(null);
    setIsReceiptShown(false);
  };

  return (
    <Modal
      isOpen={!!selectedItem || isReceiptShown}
      onClose={onClose}
      withInput
    >
      <View
        style={styles.modalContainer}
        className="justify-center items-center"
      >
        <ConfirmAction onClose={() => setSelectedItem(null)} />
        {isReceiptShown && (salesId || contextMenu.selectedItem) && (
          <Receipt
            closeModal={onClose}
            salesId={salesId || contextMenu.selectedItem.id || ""}
          />
        )}
      </View>
    </Modal>
  );
};

export default ModalForm;
