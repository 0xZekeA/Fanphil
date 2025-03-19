import { getSpecificPurchaseItems } from "@/database/purchases";
import { useInventoryProvider } from "@/providers/inventory/InventoryProvider";
import { HistoryListProviderContextTypes } from "@/types/purchaseHistory.type";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const HistoryListProviderContext = createContext<
  HistoryListProviderContextTypes | undefined
>(undefined);

const HistoryListProvider = ({ children }: PropsWithChildren) => {
  const { purchases } = useInventoryProvider();

  const [selectedItem, setSelectedItem] = useState<Purchase | null>(null);
  const [items, setItems] = useState<PurchasedItem[] | null>(null);

  const data: Purchase[] = [...purchases].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  );

  const purchasedItems = useCallback(async () => {
    if (!selectedItem) return;
    const purItems =
      (await getSpecificPurchaseItems((selectedItem as Purchase)?.id || "")) ||
      [];
    setItems(purItems);
  }, [selectedItem]);

  useEffect(() => {
    if (selectedItem && !items) purchasedItems();
  }, [items, purchasedItems, selectedItem]);

  const onCloseModal = () => {
    setSelectedItem(null);
    setItems(null);
  };

  const getPurchaseItemsLength = useCallback(async (item: Purchase) => {
    const purItems =
      (await getSpecificPurchaseItems((item as Purchase)?.id || "")) || [];
    return purItems.length;
  }, []);

  return (
    <HistoryListProviderContext.Provider
      value={{
        data,
        selectedItem,
        setSelectedItem,
        purchasedItems,
        items,
        getPurchaseItemsLength,
        onCloseModal,
      }}
    >
      {children}
    </HistoryListProviderContext.Provider>
  );
};
export default HistoryListProvider;

export const useHistoryListProvider = () => {
  const context = useContext(HistoryListProviderContext);
  if (!context) {
    throw new Error(
      "useHistoryListProvider must be used within a HistoryListProviderProvider",
    );
  }
  return context;
};
