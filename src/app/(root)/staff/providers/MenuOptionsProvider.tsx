import { useAuthProvider } from "@/providers/auth";
import { ContextMenuTypes } from "@/types/inventory.type";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import getMenuItems from "../constants/menuItems";

const MenuOptionsContext = createContext<MenuOptionsContextProps | null>(null);

const MenuOptionsProvider = ({ children }: PropsWithChildren) => {
  const { user } = useAuthProvider();
  const isAdmin = user?.role === "Creator" || user?.role === "Owner";

  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmOption, setIsConfirmOption] = useState(false);
  const [action, setAction] = useState<Action | null>(null);
  const [contextMenu, setContextMenu] = useState<ContextMenuTypes>({
    visible: false,
    position: { x: 0, y: 0 },
    selectedItem: null,
  });

  const menuItems = useMemo(
    () =>
      contextMenu.selectedItem
        ? getMenuItems(
            contextMenu.selectedItem,
            isAdmin,
            setIsConfirmOption,
            setIsLoading,
            setAction,
          )
        : null,
    [contextMenu.selectedItem, isAdmin],
  );

  const onModalClose = () => {
    setIsConfirmOption(false);
  };

  const isModalOpen = isConfirmOption;

  const roleNameOrCategory = action ? action.item.role : "null";

  const staffName = action
    ? action.item &&
      action.item.full_name &&
      action.item.full_name.split(" ")[0]
    : "User";

  const modalHeaderText = action
    ? `Are you sure you want to ${action.type} ${
        action?.category ? "this" : ""
      } ${roleNameOrCategory} ${staffName}?`
    : "Are you sure you want to continue this operation?";

  useEffect(() => {
    if (!isConfirmOption && action) setAction(null);
  }, [action, isConfirmOption]);

  const handleLongPress = (item: any, event: any) => {
    const { pageX, pageY } = event.nativeEvent;
    setContextMenu({
      visible: true,
      position: { x: pageX, y: pageY },
      selectedItem: item,
    });
  };

  return (
    <MenuOptionsContext.Provider
      value={{
        isAdmin,
        menuItems,
        contextMenu,
        setContextMenu,
        setIsConfirmOption,
        setAction,
        isLoading,
        setIsLoading,
        isConfirmOption,
        action,
        onModalClose,
        isModalOpen,
        modalHeaderText,
        handleLongPress,
      }}
    >
      {children}
    </MenuOptionsContext.Provider>
  );
};

export default MenuOptionsProvider;

export const useMenuOptions = () => {
  const context = useContext(MenuOptionsContext);
  if (!context) {
    throw new Error("useMenuOptions must be used within a MenuOptionsProvider");
  }
  return context;
};
