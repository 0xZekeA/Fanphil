import React from "react";
import HistoryListProvider from "./hooks/HistoryListProvider";
import MainScreen from "./mainScreen";

const TransferHistory = () => {
  return (
    <HistoryListProvider>
      <MainScreen />
    </HistoryListProvider>
  );
};

export default TransferHistory;
