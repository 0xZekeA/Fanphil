import { addInventoryTransfer } from "@/database/inventory-transfers";
import { addTransferItem } from "@/database/transfer-item";
import { useAuthProvider } from "@/providers/auth";
import { useInventoryProvider } from "@/providers/inventory/InventoryProvider";
import { useSellerDetsProvider } from "@/providers/seller/SellerDetsProvider";
import {
  Action,
  Item,
  TransferFormProviderContextTypes,
} from "@/types/transfer.type";
import { showToast } from "@/utils/notification";
import BottomSheet from "@gorhom/bottom-sheet";
import {
  createContext,
  PropsWithChildren,
  Reducer,
  useContext,
  useReducer,
  useRef,
  useState,
} from "react";
import reducer from "../utils/reducer";

const TransferFormProviderContext = createContext<
  TransferFormProviderContextTypes | undefined
>(undefined);

const TransferFormProvider = ({ children }: PropsWithChildren) => {
  const { filteredInventory } = useInventoryProvider();
  const { user } = useAuthProvider();
  const { sellers } = useSellerDetsProvider();

  const bottomSheetRef = useRef<BottomSheet>(null);

  const [selectedItems, dispatch] = useReducer<Reducer<Item[], Action>>(
    reducer,
    [],
  );
  const [selectedDriver, setSelectedDriver] = useState(sellers[0]);
  const [error, setError] = useState<string | null>(null);
  const [holdInterval, setHoldInterval] = useState<number | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleIncrease = (id: string, amount = 1) => {
    const inventoryItem = filteredInventory.find((i) => i.id === id);
    const item = selectedItems.find((i) => i.id === id);

    if (!inventoryItem) return;

    if (!item) {
      dispatch({
        type: "ADD_ITEM",
        item: {
          id: inventoryItem.id,
          name: inventoryItem.name,
          stock: inventoryItem.quantity,
          quantity: 1,
        },
      });
    }
    if (item && item.quantity + amount > item.stock) {
      setError(`Cannot exceed stock (${item.quantity})`);
      return;
    }
    setError(null);
    dispatch({ type: "INCREASE", id, amount });
  };

  const handleDecrease = (id: string, amount = 1) => {
    dispatch({ type: "DECREASE", id, amount });
  };

  const startHoldAction = (id: string, type: "INCREASE" | "DECREASE") => {
    setHoldInterval(
      setInterval(() => {
        if (type === "INCREASE") handleIncrease(id, 5);
        else handleDecrease(id, 5);
      }, 50),
    );
  };

  const stopHoldAction = () => {
    if (holdInterval) clearInterval(holdInterval);
  };

  const getItemQuantity = (id: string) => {
    const item = selectedItems.find((item) => item.id === id);
    return item ? item.quantity : 0;
  };

  const openSheet = () => {
    setIsSheetOpen(true);
    bottomSheetRef.current?.expand();
  };
  const closeSheet = () => {
    setIsSheetOpen(false);
    bottomSheetRef.current?.close();
  };

  const handleRemoveItem = (id: string) => {
    dispatch({ type: "REMOVE_ITEM", id });
  };

  const submitTransfer = async () => {
    if (!selectedDriver) {
      showToast("error", "Please add a driver from the Staff screen");
      return;
    }
    if (!selectedItems) {
      showToast("error", "Please make sure an item is selected");
      return;
    }

    if (!user) {
      showToast("error", "App may require a restart", "Contact developer");
      return;
    }

    try {
      const transferId = await addInventoryTransfer(user.id, selectedDriver.id);

      const id = await Promise.all(
        selectedItems
          .filter((item) => item.quantity > 0)
          .map((item) => addTransferItem(item.id, transferId, item.quantity)),
      );

      if (id.length < 1) {
        showToast(
          "error",
          "Please ensure an amount was added to the item selected",
        );
        return;
      }
      showToast("success", "Transfer completed successfully");
    } catch (error: any) {
      console.error(error);
      showToast(
        "error",
        "An unexpected error occured",
        `Error details: ${error.message}`,
      );
    }
  };

  const selectedInventoryItems = filteredInventory.filter((item) =>
    selectedItems.some((s) => s.id === item.id),
  );

  return (
    <TransferFormProviderContext.Provider
      value={{
        startHoldAction,
        handleDecrease,
        handleIncrease,
        filteredInventory,
        error,
        holdInterval,
        selectedDriver,
        setSelectedDriver,
        getItemQuantity,
        stopHoldAction,
        bottomSheetRef,
        isSheetOpen,
        openSheet,
        closeSheet,
        selectedItems,
        selectedInventoryItems,
        submitTransfer,
        handleRemoveItem,
      }}
    >
      {children}
    </TransferFormProviderContext.Provider>
  );
};
export default TransferFormProvider;

export const useTransferFormProvider = () => {
  const context = useContext(TransferFormProviderContext);
  if (!context) {
    throw new Error(
      "useTransferFormProvider must be used within a TransferFormProviderProvider",
    );
  }
  return context;
};
