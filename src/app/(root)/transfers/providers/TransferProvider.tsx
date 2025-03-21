import { useInventoryProvider } from "@/providers/inventory/InventoryProvider";
import { capitalizeItem } from "@/utils/capitalize";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from "react";

interface TransferProviderContextTypes {
  items: string[];
  addItem: (id: string) => void;
  emptyItems: () => void;
  getName: (id: string) => string;
  formatName: (id: Inventory) => string;
  getSize: (id: Inventory) => string;
}

const TransferProviderContext = createContext<
  TransferProviderContextTypes | undefined
>(undefined);

const TransferProvider = ({ children }: PropsWithChildren) => {
  const { filteredInventory } = useInventoryProvider();
  const [items, setItems] = useState<string[]>([]);

  const addItem = (id: string) => setItems((prev) => [...prev, id]);
  const emptyItems = () => setItems([]);

  const getName = (id: string) =>
    filteredInventory.find((i) => i.id === id)?.name || "Item";

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
    <TransferProviderContext.Provider
      value={{ items, addItem, emptyItems, getName, formatName, getSize }}
    >
      {children}
    </TransferProviderContext.Provider>
  );
};
export default TransferProvider;

export const useTransferProvider = () => {
  const context = useContext(TransferProviderContext);
  if (!context) {
    throw new Error(
      "useTransferProvider must be used within a TransferProviderProvider",
    );
  }
  return context;
};
