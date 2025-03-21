import React from "react";
import MainScreen from "./mainScreen";
import InventoryListProvider from "./providers/InventoryListProvider";
import InventorySearchProvider from "./providers/InventorySearchProvider";
import MenuProvider from "./providers/MenuProvider";
import RemoveItemsProvider from "./providers/RemoveItemsProvider";

const Inventory = () => {
  return (
    <InventoryListProvider>
      <InventorySearchProvider>
        <MenuProvider>
          <RemoveItemsProvider>
            <MainScreen />
          </RemoveItemsProvider>
        </MenuProvider>
      </InventorySearchProvider>
    </InventoryListProvider>
  );
};

export default Inventory;
