import { useSalesProvider } from "@/providers/sales/SalesProvider";
import { ContextMenuTypes } from "@/types/inventory.type";
import { MenuProviderContextTypes } from "@/types/sales.type";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import getMenuItems from "../constants/menuItems";
import { useSalesDataProvider } from "./SalesDataProvider";
import { useSellItemFormProvider } from "./SellItemFormProvider";

const MenuProviderContext = createContext<MenuProviderContextTypes | undefined>(
  undefined,
);

const MenuProvider = ({ children }: PropsWithChildren) => {
  const {
    setSelectedCustomer,
    openSheet,
    setIsReceiptShown,
    isSaleCompleted,
    setIsSaleCompleted,
  } = useSellItemFormProvider();
  const { setIsOwingFiltered, isOwingFiltered } = useSalesDataProvider();
  const { customers } = useSalesProvider();

  const [isSalesInterface, setIsSalesInterface] = useState(false);
  const [isItem, setIsItem] = useState(false);
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
      openSheet,
      setIsOwingFiltered,
      isOwingFiltered,
      isItem,
      setIsReceiptShown,
    );

  const onOpenMenuOptions = (event: any) => {
    const { pageX, pageY } = event.nativeEvent;
    setIsItem(false);
    setContextMenu({
      visible: true,
      position: { x: pageX, y: pageY },
      selectedItem: {},
    });
  };

  useEffect(() => {
    if (isSaleCompleted && isSalesInterface)
      setTimeout(() => setIsSaleCompleted(false), 5000);
  }, [isSaleCompleted, isSalesInterface, setIsSaleCompleted]);

  const onOpenItemsMenu = (event: any, item: Sale) => {
    const { pageX, pageY } = event.nativeEvent;
    setIsItem(true);
    setContextMenu({
      visible: true,
      position: { x: pageX, y: pageY },
      selectedItem: item,
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
        onOpenItemsMenu,
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
