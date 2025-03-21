import { router } from "expo-router";
import { Dispatch, SetStateAction } from "react";

const getMenuItems = (
  customers: Customer[],
  setIsSalesInterface: Dispatch<SetStateAction<boolean>>,
  isSalesInterface: boolean,
  setSelectedCustomer: Dispatch<SetStateAction<Customer>>,
  openSheet: () => void,
  setIsOwingFiltered: Dispatch<SetStateAction<boolean>>,
  isOwingFiltered: boolean,
  isItem: boolean,
  setIsReceiptShown: Dispatch<SetStateAction<boolean>>,
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

  const menuItems = [];
  if (isItem) {
    menuItems.push({
      name: "Save receipt",
      onPress: () => setIsReceiptShown(true),
    });
  } else {
    menuItems.push(
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
      {
        name: isOwingFiltered ? "Back to Sales" : "Owing Customers",
        onPress: () => setIsOwingFiltered(!isOwingFiltered),
      },
    );
  }

  return menuItems;
};

export default getMenuItems;
