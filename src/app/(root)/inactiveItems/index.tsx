import React from "react";
import MainScreen from "./mainScreen";
import InactiveHooksProvider from "./providers/InactiveHooksProvider";
import PopUpsProvider from "./providers/PopUpsProvider";

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
