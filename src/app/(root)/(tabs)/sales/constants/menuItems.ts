import { router } from "expo-router";
import { Dispatch, SetStateAction } from "react";

const getMenuItems = (
  customers: Customer[],
  setIsSalesInterface: Dispatch<SetStateAction<boolean>>,
  isSalesInterface: boolean,
  setSelectedCustomer: Dispatch<SetStateAction<Customer>>,
  openSheet: () => void,
) => {
  if (isSalesInterface) {
    if (!customers)
      return [
        {
          name: "Add a customer",
          onPress: () => router.push("/(root)/customers"),
        },
      ];

    return customers.map((c) => ({
      name: c.name,
      onPress: () => setSelectedCustomer(c),
    }));
  }

  const menuItems = [
    {
      name: "Make sale",
      onPress: () => {
        setIsSalesInterface(true);
        openSheet();
      },
    },
    {
      name: "Customers",
      onPress: () => router.push("/(root)/customers"),
    },
  ];

  return menuItems;
};

export default getMenuItems;
