import React from "react";
import { ScrollView, View } from "react-native";
import Toast from "react-native-toast-message";
import styles from "../styles/styles";
import FormFields from "./FormFields";

const AddItemsForm = () => {
  return (
    <View style={styles.addInventoryItemsContentContainer}>
      <ScrollView>
        <FormFields />
      </ScrollView>
      <Toast />
    </View>
  );
};

export default AddItemsForm;
