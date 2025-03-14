import React from "react";
import MenuProvider from "./hooks/MenuProvider";
import SalesDataProvider from "./hooks/SalesDataProvider";
import SellItemFormProvider from "./hooks/SellItemFormProvider";
import SellItemProvider from "./hooks/SellItemProvider";
import MainScreen from "./mainScreen";

const Sales = () => {
  return (
    <SalesDataProvider>
      <SellItemProvider>
        <SellItemFormProvider>
          <MenuProvider>
            <MainScreen />
          </MenuProvider>
        </SellItemFormProvider>
      </SellItemProvider>
    </SalesDataProvider>
  );
};

export default Sales;
