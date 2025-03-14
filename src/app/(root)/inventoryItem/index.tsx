import React from "react";
import InventoryFormProvider from "./hooks/InventoryFormProvider";
import ItemProvider from "./hooks/ItemProvider";
import MainScreen from "./mainScreen";

const InventoryItem = () => {
  return (
    <ItemProvider>
      <InventoryFormProvider>
        <MainScreen />
      </InventoryFormProvider>
    </ItemProvider>
  );
};

export default InventoryItem;
