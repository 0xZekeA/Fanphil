import React from "react";
import MainScreen from "./mainScreen";
import MenuProvider from "./providers/MenuProvider";
import SellersInventoryListProvider from "./providers/SellersInventoryListProvider";

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
