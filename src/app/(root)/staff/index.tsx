import CopyAnimationProvider from "@/providers/copy/CopyProvider";
import React from "react";
import MenuOptionsProvider from "./hooks/MenuOptionsProvider";
import StaffFormsProvider from "./hooks/StaffFormProvider";
import StaffProviders from "./hooks/StaffProviders";
import MainScreen from "./mainScreen";

const Staff = () => {
  return (
    <StaffProviders>
      <StaffFormsProvider>
        <MenuOptionsProvider>
          <CopyAnimationProvider>
            <MainScreen />
          </CopyAnimationProvider>
        </MenuOptionsProvider>
      </StaffFormsProvider>
    </StaffProviders>
  );
};

export default Staff;
