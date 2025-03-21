import React from "react";
import MainScreen from "./mainScreen";
import CustomerFormProvider from "./providers/CustomerFormProvider";
import CustomersProvider from "./providers/CustomersProvider";

const AddItems = () => {
  return (
    <CustomersProvider>
      <CustomerFormProvider>
        <MainScreen />
      </CustomerFormProvider>
    </CustomersProvider>
  );
};

export default AddItems;
