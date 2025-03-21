import React from "react";
import MainScreen from "./mainScreen";
import MenuProvider from "./providers/MenuProvider";
import TransferFormProvider from "./providers/TransferFormProvider";
import TransferProvider from "./providers/TransferProvider";

const TransferItems = () => {
  return (
    <TransferProvider>
      <TransferFormProvider>
        <MenuProvider>
          <MainScreen />
        </MenuProvider>
      </TransferFormProvider>
    </TransferProvider>
  );
};

export default TransferItems;
