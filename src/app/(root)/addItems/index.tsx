import React from "react";
import InventoryFormProvider from "./hooks/InventoryFormProvider";
import MainScreen from "./mainScreen";

const AddItems = () => {
  return (
    <InventoryFormProvider>
      <MainScreen />
    </InventoryFormProvider>
  );
};

export default AddItems;
