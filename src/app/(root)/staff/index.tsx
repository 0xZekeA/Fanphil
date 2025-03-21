import CopyAnimationProvider from "@/providers/copy/CopyProvider";
import React from "react";
import MainScreen from "./mainScreen";
import MenuOptionsProvider from "./providers/MenuOptionsProvider";
import StaffFormsProvider from "./providers/StaffFormProvider";
import StaffProviders from "./providers/StaffProviders";

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
