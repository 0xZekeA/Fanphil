import React from "react";
import Toast from "react-native-toast-message";
import InactiveHooksProvider from "./hooks/InactiveHooksProvider";
import PopUpsProvider from "./hooks/PopUpsProvider";
import MainScreen from "./mainScreen";

const InactiveItems = () => {
  return (
    <InactiveHooksProvider>
      <PopUpsProvider>
        <MainScreen />
        <Toast />
      </PopUpsProvider>
    </InactiveHooksProvider>
  );
};

export default InactiveItems;
