import React from "react";
import Toast from "react-native-toast-message";
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
          <Toast />
        </MenuProvider>
      </InventorySearchProvider>
    </InventoryListProvider>
  );
};

export default Inventory;
