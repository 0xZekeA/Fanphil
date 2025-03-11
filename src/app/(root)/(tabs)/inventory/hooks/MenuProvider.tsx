import { deleteInventory } from "@/database/inventory";
import { useAuthProvider } from "@/providers/auth";
import {
  ContextMenuTypes,
  MenuProviderContextTypes,
} from "@/types/inventory.type";
import { showToast } from "@/utils/notification";
import { createContext, PropsWithChildren, useContext, useState } from "react";
import getMenuItems from "../constants/menuItems";

const MenuProviderContext = createContext<MenuProviderContextTypes | undefined>(
  undefined,
);

const MenuProvider = ({ children }: PropsWithChildren) => {
  const [menuType, setMenuType] = useState<"options" | "item" | null>(null);
  const [isConfirmOption, setIsConfirmOption] = useState(false);
  const [contextMenu, setContextMenu] = useState<ContextMenuTypes>({
    visible: false,
    position: { x: 0, y: 0 },
    selectedItem: null,
  });
  const [loading, setLoading] = useState(false);

  const { user } = useAuthProvider();
  const isAdmin = user?.role === "Creator" || user?.role === "Owner";

  const menuItems =
    contextMenu.selectedItem &&
    getMenuItems(
      contextMenu.selectedItem,
      menuType,
      isAdmin,
      setIsConfirmOption,
    );

  const onOpenMenuItems = (item: Inventory, event: any) => {
    const { pageX, pageY } = event.nativeEvent;
    setMenuType("item");
    setContextMenu({
      visible: true,
      position: { x: pageX, y: pageY },
      selectedItem: item,
    });
  };

  const onOpenMenuOptions = (event: any) => {
    const { pageX, pageY } = event.nativeEvent;
    setMenuType("options");
    setContextMenu({
      visible: true,
      position: { x: pageX, y: pageY },
      selectedItem: {},
    });
  };

  const deactivateItem = async () => {
    if (!contextMenu.selectedItem) {
      showToast(
        "error",
        "Item wasn't selected properly",
        "Please contact admin",
      );
      return;
    }

    try {
      await deleteInventory(contextMenu.selectedItem);
      showToast("success", "Item deactivated successfully");
    } catch (error: any) {
      showToast(
        "error",
        "Failed to deactivate item",
        `Error details: ${error.message}`,
      );
      console.error("Error in deactivateItem:", error);
    }
  };

  return (
    <MenuProviderContext.Provider
      value={{
        contextMenu,
        setContextMenu,
        menuItems,
        onOpenMenuItems,
        onOpenMenuOptions,
        isConfirmOption,
        setIsConfirmOption,
        deactivateItem,
        loading,
        setLoading,
      }}
    >
      {children}
    </MenuProviderContext.Provider>
  );
};
export default MenuProvider;

export const useMenuProvider = () => {
  const context = useContext(MenuProviderContext);
  if (!context) {
    throw new Error(
      "useMenuProvider must be used within a MenuProviderProvider",
    );
  }
  return context;
};
