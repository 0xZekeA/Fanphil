import React from "react";
import { ScrollView, View } from "react-native";
import styles from "../styles/styles";
import FormFields from "./FormFields";

const AddItemsForm = () => {
  return (
    <View style={styles.addInventoryItemsContentContainer}>
      <ScrollView>
        <FormFields />
      </ScrollView>
    </View>
  );
};

export default AddItemsForm;
