import React from "react";
import MainScreen from "./mainScreen";
import InventoryFormProvider from "./providers/InventoryFormProvider";
import ItemProvider from "./providers/ItemProvider";

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
