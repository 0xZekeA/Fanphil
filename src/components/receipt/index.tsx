import React from "react";
import { Pressable, ScrollView } from "react-native";
import CustomButton from "../customButton";
import useReceiptHooks from "./hooks/receipt.hooks";
import Footer from "./receiptItems/Footer";
import Header from "./receiptItems/Header";
import Info from "./receiptItems/Info";
import ItemsHeader from "./receiptItems/ItemsHeader";
import ItemsList from "./receiptItems/ItemsList";
import Seperator from "./receiptItems/Seperator";
import Summary from "./receiptItems/Summary";
import styles from "./styles";

const Receipt = ({ salesId, closeModal }: ReceiptProps) => {
  const { selectedItems, receiptRef, saveReceiptToGallery } =
    useReceiptHooks(salesId);

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <CustomButton title="Save Image" onPress={saveReceiptToGallery} />
      <Pressable ref={receiptRef} style={styles.receiptCard}>
        <Header />
        <Info salesId={salesId} />
        <Seperator />
        <ItemsHeader />
        <ItemsList selectedItems={selectedItems ? selectedItems : []} />
        <Seperator />
        <Summary salesId={salesId} />
        <Footer />
      </Pressable>
      <CustomButton title="Close" onPress={closeModal} />
    </ScrollView>
  );
};

export default Receipt;
