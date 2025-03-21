import React from "react";
import MainScreen from "./mainScreen";
import PurchasesFormProvider from "./providers/PurchasesFormProvider";
import PurchasesProvider from "./providers/PurchasesProvider";

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
