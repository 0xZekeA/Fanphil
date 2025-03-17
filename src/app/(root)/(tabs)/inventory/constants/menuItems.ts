import { router } from "expo-router";
import { Dispatch, SetStateAction } from "react";

const getMenuItems = (
  item: Inventory,
  type: "options" | "item" | null,
  isAdmin: boolean,
  setIsConfirmOption: Dispatch<SetStateAction<boolean>>,
  setIsRemoveOption: Dispatch<SetStateAction<boolean>>,
) => {
  if (!item) return null;

  const menuItems = [];

  if (type === "item") {
    menuItems.push(
      {
        name: "Edit",
        onPress: () =>
          router.push({
            pathname: "/(root)/inventoryItem",
            params: { id: item.id },
          }),
      },
      {
        name: "Make Inactive",
        onPress: () => setIsConfirmOption(true),
        hidden: !isAdmin,
      },
      {
        name: "Remove some items",
        onPress: () => setIsRemoveOption(true),
        hidden: !isAdmin,
      },
    );
  }

  if (type === "options") {
    menuItems.push(
      {
        name: "Inactive Items",
        onPress: () => router.push("/(root)/inactiveItems"),
      },
      {
        name: "Add Items",
        onPress: () => router.push("/(root)/addItems"),
      },
      {
        name: "Seller's Inventory",
        onPress: () => router.push("/(root)/sellersInventory"),
      },
      {
        name: "Transfer",
        onPress: () => router.push("/(root)/transfers"),
      },
    );
  }

  return menuItems.filter((item) => !item.hidden);
};

export default getMenuItems;
