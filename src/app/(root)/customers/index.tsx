import React from "react";
import CustomerFormProvider from "./hooks/CustomerFormProvider";
import CustomersProvider from "./hooks/CustomersProvider";
import MainScreen from "./mainScreen";

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
