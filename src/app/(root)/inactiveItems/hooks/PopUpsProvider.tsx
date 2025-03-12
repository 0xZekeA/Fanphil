import { reactivateInventoryItem } from "@/database/inventory";
import { PopUpsProviderContextTypes } from "@/types/inactive.type";
import { ContextMenuTypes } from "@/types/inventory.type";
import { showToast } from "@/utils/notification";
import { createContext, PropsWithChildren, useContext, useState } from "react";

const PopUpsProviderContext = createContext<
  PopUpsProviderContextTypes | undefined
>(undefined);

const PopUpsProvider = ({ children }: PropsWithChildren) => {
  const [contextMenu, setContextMenu] = useState<ContextMenuTypes>({
    visible: false,
    position: { x: 0, y: 0 },
    selectedItem: null,
  });
  const [isConfirmOption, setIsConfirmOption] = useState(false);
  const [loading, setLoading] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const [isMessageShown, setIsMessageShown] = useState(false);

  const menuItems = [
    {
      name: "Activate",
      onPress: () => setIsConfirmOption(true),
    },
  ];

  const showMessage = (event: any) => {
    setPosition({
      x: event.nativeEvent.pageX,
      y: event.nativeEvent.pageY,
    });
    setIsMessageShown(true);
  };

  const message = "Hold Button";

  const onClose = () => setIsMessageShown(false);

  const onOpen = (item: Inventory, event: any) => {
    const { pageX, pageY } = event.nativeEvent;
    setContextMenu({
      visible: true,
      position: { x: pageX, y: pageY },
      selectedItem: item,
    });
  };

  const reactivateItem = async () => {
    if (!contextMenu.selectedItem) {
      showToast(
        "error",
        "Item wasn't selected properly",
        "Please contact admin",
      );
      return;
    }

    try {
      setLoading(true);
      await reactivateInventoryItem(contextMenu.selectedItem.id);
      showToast("success", "Item deactivated successfully");
    } catch (error: any) {
      showToast(
        "error",
        "Failed to reactivate item",
        `Error details: ${error.message}`,
      );
      console.error("Error in deactivateItem:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PopUpsProviderContext.Provider
      value={{
        contextMenu,
        setContextMenu,
        menuItems,
        onOpen,
        setIsMessageShown,
        isMessageShown,
        position,
        showMessage,
        onClose,
        message,
        reactivateItem,
        isConfirmOption,
        setIsConfirmOption,
        loading,
      }}
    >
      {children}
    </PopUpsProviderContext.Provider>
  );
};
export default PopUpsProvider;

export const usePopUpsProvider = () => {
  const context = useContext(PopUpsProviderContext);
  if (!context) {
    throw new Error(
      "usePopUpsProvider must be used within a PopUpsProviderProvider",
    );
  }
  return context;
};
