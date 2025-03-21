import React from "react";
import MainScreen from "./mainScreen";
import MenuProvider from "./providers/MenuProvider";
import SalesDataProvider from "./providers/SalesDataProvider";
import SellItemFormProvider from "./providers/sellForm/SellItemFormProvider";
import SellItemProvider from "./providers/SellItemProvider";

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
