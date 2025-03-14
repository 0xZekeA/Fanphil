import React from "react";
import InventoryListProvider from "./hooks/InventoryListProvider";
import InventorySearchProvider from "./hooks/InventorySearchProvider";
import MenuProvider from "./hooks/MenuProvider";
import MainScreen from "./mainScreen";

const Inventory = () => {
  return (
    <InventoryListProvider>
      <InventorySearchProvider>
        <MenuProvider>
          <MainScreen />
        </MenuProvider>
      </InventorySearchProvider>
    </InventoryListProvider>
  );
};

export default Inventory;
