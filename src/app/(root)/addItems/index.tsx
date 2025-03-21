import React from "react";
import MainScreen from "./mainScreen";
import InventoryFormProvider from "./providers/InventoryFormProvider";

const AddItems = () => {
  return (
    <InventoryFormProvider>
      <MainScreen />
    </InventoryFormProvider>
  );
};

export default AddItems;
