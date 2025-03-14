import React from "react";
import InactiveHooksProvider from "./hooks/InactiveHooksProvider";
import PopUpsProvider from "./hooks/PopUpsProvider";
import MainScreen from "./mainScreen";

const InactiveItems = () => {
  return (
    <InactiveHooksProvider>
      <PopUpsProvider>
        <MainScreen />
      </PopUpsProvider>
    </InactiveHooksProvider>
  );
};

export default InactiveItems;
