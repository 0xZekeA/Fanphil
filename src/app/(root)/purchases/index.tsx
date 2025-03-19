import React from "react";
import PurchasesFormProvider from "./hooks/PurchasesFormProvider";
import PurchasesProvider from "./hooks/PurchasesProvider";
import MainScreen from "./mainScreen";

const TransferItems = () => {
  return (
    <PurchasesProvider>
      <PurchasesFormProvider>
        <MainScreen />
      </PurchasesFormProvider>
    </PurchasesProvider>
  );
};

export default TransferItems;
