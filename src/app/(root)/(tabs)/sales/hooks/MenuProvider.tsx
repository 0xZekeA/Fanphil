import { useSalesProvider } from "@/providers/sales/SalesProvider";
import { ContextMenuTypes } from "@/types/inventory.type";
import { MenuProviderContextTypes } from "@/types/sales.type";
import { createContext, PropsWithChildren, useContext, useState } from "react";
import getMenuItems from "../constants/menuItems";
import { useSellItemFormProvider } from "./SellItemFormProvider";

const MenuProviderContext = createContext<MenuProviderContextTypes | undefined>(
  undefined,
);

const MenuProvider = ({ children }: PropsWithChildren) => {
  const { setSelectedCustomer } = useSellItemFormProvider();
  const { customers } = useSalesProvider();

  const [isSalesInterface, setIsSalesInterface] = useState(false);
  const [contextMenu, setContextMenu] = useState<ContextMenuTypes>({
    visible: false,
    position: { x: 0, y: 0 },
    selectedItem: null,
  });

  const menuItems =
    contextMenu.selectedItem &&
    getMenuItems(
      customers,
      setIsSalesInterface,
      isSalesInterface,
      setSelectedCustomer,
    );

  const onOpenMenuOptions = (event: any) => {
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
        onOpenMenuOptions,
        isSalesInterface,
        setIsSalesInterface,
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
