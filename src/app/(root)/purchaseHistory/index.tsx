import React from "react";
import MainScreen from "./mainScreen";
import HistoryListProvider from "./providers/HistoryListProvider";

const TransferHistory = () => {
  return (
    <HistoryListProvider>
      <MainScreen />
    </HistoryListProvider>
  );
};

export default TransferHistory;
