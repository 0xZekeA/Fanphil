import { removeItem } from "@/database/inventory";
import { useAuthProvider } from "@/providers/auth";
import { RemoveItemsProviderContextTypes } from "@/types/inventory.type";
import { showToast } from "@/utils/notification";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { useMenuProvider } from "./MenuProvider";
import useRemoveItemsHooks from "./removeItems.hooks";

const RemoveItemsProviderContext = createContext<
  RemoveItemsProviderContextTypes | undefined
>(undefined);

const RemoveItemsProvider = ({ children }: PropsWithChildren) => {
  const { user } = useAuthProvider();
  const { contextMenu } = useMenuProvider();

  const [item, setItem] = useState<Inventory | null>(null);

  const {
    removedQuantity,
    getRemainingQuantity,
    handleIncrease,
    handleDecrease,
    startHoldAction,
    stopHoldAction,
    resetRemovedQuantity,
  } = useRemoveItemsHooks(item ? item.quantity : 0);

  useEffect(() => {
    if (contextMenu.selectedItem) {
      setItem(contextMenu.selectedItem);
    }
  }, [contextMenu]);

  const handleRemovedItems = async () => {
    if (!removedQuantity) {
      showToast("error", "Add an amount to be removed");
      return;
    }
    if (!user || !item) {
      return;
    }

    const remaining = removedQuantity;

    await removeItem(item.name, item.cost_price, item.id, remaining, user.id);
  };

  return (
    <RemoveItemsProviderContext.Provider
      value={{
        removedQuantity,
        getRemainingQuantity,
        handleIncrease,
        handleDecrease,
        startHoldAction,
        stopHoldAction,
        resetRemovedQuantity,
        handleRemovedItems,
      }}
    >
      {children}
    </RemoveItemsProviderContext.Provider>
  );
};
export default RemoveItemsProvider;

export const useRemoveItemsProvider = () => {
  const context = useContext(RemoveItemsProviderContext);
  if (!context) {
    throw new Error(
      "useRemoveItemsProvider must be used within a RemoveItemsProviderProvider",
    );
  }
  return context;
};
