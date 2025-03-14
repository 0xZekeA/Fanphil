import React from "react";
import MenuProvider from "./hooks/MenuProvider";
import SellersInventoryListProvider from "./hooks/SellersInventoryListProvider";
import MainScreen from "./mainScreen";

const SellersInventory = () => {
  return (
    <SellersInventoryListProvider>
      <MenuProvider>
        <MainScreen />
      </MenuProvider>
    </SellersInventoryListProvider>
  );
};

export default SellersInventory;
