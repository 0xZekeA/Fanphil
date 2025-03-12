import React from "react";
import MenuProvider from "./hooks/MenuProvider";
import TransferFormProvider from "./hooks/TransferFormProvider";
import TransferProvider from "./hooks/TransferProvider";
import MainScreen from "./mainScreen";

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
