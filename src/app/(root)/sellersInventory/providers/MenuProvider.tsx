import { useUsersProvider } from "@/providers/users/UsersProvider";
import { ContextMenuTypes } from "@/types/inventory.type";
import { MenuProviderContextTypes } from "@/types/transfer.type";
import { createContext, PropsWithChildren, useContext, useState } from "react";
import getMenuItems from "../constants/menuItems";
import { useSellersInventoryListProvider } from "./SellersInventoryListProvider";

const MenuProviderContext = createContext<MenuProviderContextTypes | undefined>(
  undefined,
);

const MenuProvider = ({ children }: PropsWithChildren) => {
  const { setSelectedSeller } = useSellersInventoryListProvider();
  const [contextMenu, setContextMenu] = useState<ContextMenuTypes>({
    visible: false,
    position: { x: 0, y: 0 },
    selectedItem: null,
  });

  const { sellers } = useUsersProvider();

  const menuItems =
    contextMenu.selectedItem && getMenuItems(sellers, setSelectedSeller);

  const onOpen = (event: any) => {
    const { pageX, pageY } = event.nativeEvent;
    setContextMenu({
      visible: true,
      position: { x: pageX, y: pageY },
      selectedItem: {},
    });
  };

  return (
    <MenuProviderContext.Provider
      value={{
        contextMenu,
        setContextMenu,
        menuItems,
        onOpen,
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
