import React from "react";
import Toast from "react-native-toast-message";
import InventoryFormProvider from "./hooks/InventoryFormProvider";
import ItemProvider from "./hooks/ItemProvider";
import MainScreen from "./mainScreen";

const InventoryItem = () => {
  return (
    <ItemProvider>
      <InventoryFormProvider>
        <MainScreen />
      </InventoryFormProvider>
      <Toast />
    </ItemProvider>
  );
};

export default InventoryItem;
