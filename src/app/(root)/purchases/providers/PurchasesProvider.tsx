import { useInventoryProvider } from "@/providers/inventory/InventoryProvider";
import { PurchasesProviderContextTypes } from "@/types/purchases.type";
import { capitalizeItem } from "@/utils/capitalize";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from "react";

const PurchasesProviderContext = createContext<
  PurchasesProviderContextTypes | undefined
>(undefined);

const PurchasesProvider = ({ children }: PropsWithChildren) => {
  const { inventoryMap } = useInventoryProvider();
  const [items, setItems] = useState<string[]>([]);

  const addItem = (id: string) => setItems((prev) => [...prev, id]);
  const emptyItems = () => setItems([]);

  const getName = (id: string) => inventoryMap.get(id)?.name || "Item";

  const formatName = useCallback(
    (item: Inventory) =>
      capitalizeItem((item.name || "").slice(0, 10)) +
      ((item.name || "").length > 10 ? "..." : ""),
    [],
  );

  const getSize = useCallback(
    (item: Inventory) => (item.size || 24) + (item.unit || "pcs"),
    [],
  );

  return (
    <PurchasesProviderContext.Provider
      value={{ items, addItem, emptyItems, getName, formatName, getSize }}
    >
      {children}
    </PurchasesProviderContext.Provider>
  );
};
export default PurchasesProvider;

export const usePurchasesProvider = () => {
  const context = useContext(PurchasesProviderContext);
  if (!context) {
    throw new Error(
      "usePurchasesProvider must be used within a PurchasesProviderProvider",
    );
  }
  return context;
};
