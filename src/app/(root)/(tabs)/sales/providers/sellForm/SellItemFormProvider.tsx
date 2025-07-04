import { useInventoryProvider } from "@/providers/inventory/InventoryProvider";
import { useSalesProvider } from "@/providers/sales/SalesProvider";
import { SellItemFormProviderContextTypes } from "@/types/sales.type";
import BottomSheet from "@gorhom/bottom-sheet";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import useAddActionsHooks from "./addActions.hooks";
import useSubmitHooks from "./submit.hooks";

const SellItemFormProviderContext = createContext<
  SellItemFormProviderContextTypes | undefined
>(undefined);

const SellItemFormProvider = ({ children }: PropsWithChildren) => {
  const { filteredInventory, inventoryMap } = useInventoryProvider();
  const { customers } = useSalesProvider();

  const bottomSheetRef = useRef<BottomSheet>(null);
  const [selectedCustomer, setSelectedCustomer] = useState(customers?.[0]);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (customers && (customers || []).length > 0 && !selectedCustomer) {
      setSelectedCustomer(customers[0]);
    }
  }, [customers, selectedCustomer]);

  const {
    holdInterval,
    stopHoldAction,
    getItemQuantity,
    startHoldAction,
    handleDecrease,
    handleIncrease,
    selectedItems,
    dispatch,
  } = useAddActionsHooks(setError);

  const {
    total,
    submitSale,
    salesId,
    isSaleCompleted,
    isReceiptShown,
    depositedAmount,
    handleChange,
    setIsSaleCompleted,
    setIsReceiptShown,
  } = useSubmitHooks(selectedCustomer, selectedItems, setError, dispatch);

  const openSheet = () => {
    setIsSheetOpen(true);
    bottomSheetRef.current?.expand();
  };
  const closeSheet = () => {
    setIsSheetOpen(false);
    bottomSheetRef.current?.close();
  };

  const handleSheetChange = useCallback((index: number) => {
    if (index === -1) {
      setIsSheetOpen(false);
    }
  }, []);

  const handleRemoveItem = (id: string) => {
    dispatch({ type: "REMOVE_ITEM", id });
  };

  useEffect(() => {
    if (isSaleCompleted) setTimeout(() => setIsSaleCompleted(false), 30000);
  }, [isSaleCompleted]);

  const selectedInventoryItems = useMemo(() => {
    const selectedItemsArray = Array.from(selectedItems.values());
    const selectedInventoryItems: Inventory[] = [];
    for (const item of selectedItemsArray) {
      const inventoryItem = inventoryMap.get(item.id);
      if (inventoryItem) {
        selectedInventoryItems.push(inventoryItem);
      }
    }
    return selectedInventoryItems;
  }, [inventoryMap, selectedItems]);

  return (
    <SellItemFormProviderContext.Provider
      value={{
        startHoldAction,
        handleDecrease,
        handleIncrease,
        filteredInventory,
        error,
        holdInterval,
        selectedCustomer,
        setSelectedCustomer,
        getItemQuantity,
        stopHoldAction,
        bottomSheetRef,
        isSheetOpen,
        openSheet,
        closeSheet,
        selectedItems,
        selectedInventoryItems,
        submitSale,
        handleRemoveItem,
        depositedAmount,
        handleChange,
        total,
        isSaleCompleted,
        isReceiptShown,
        setIsReceiptShown,
        salesId,
        setIsSaleCompleted,
        handleSheetChange,
      }}
    >
      {children}
    </SellItemFormProviderContext.Provider>
  );
};
export default SellItemFormProvider;

export const useSellItemFormProvider = () => {
  const context = useContext(SellItemFormProviderContext);
  if (!context) {
    throw new Error(
      "SellItemFormProvider must be used within a SellItemFormProviderProvider",
    );
  }
  return context;
};
