import { useInventoryProvider } from "@/providers/inventory/InventoryProvider";
import { capitalizeItem } from "@/utils/capitalize";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from "react";

interface SellItemProviderContextTypes {
  items: string[];
  addItem: (id: string) => void;
  emptyItems: () => void;
  getName: (id: string) => string;
  formatName: (id: Inventory) => string;
  getSize: (id: Inventory) => string;
}

const SellItemProviderContext = createContext<
  SellItemProviderContextTypes | undefined
>(undefined);

const SellItemProvider = ({ children }: PropsWithChildren) => {
  const { filteredInventory } = useInventoryProvider();
  const [items, setItems] = useState<string[]>([]);

  const addItem = (id: string) => setItems((prev) => [...prev, id]);
  const emptyItems = () => setItems([]);

  const getName = (id: string) =>
    filteredInventory.find((i) => i.id === id)?.name || "Item";

  const formatName = useCallback(
    (item: Inventory) =>
      capitalizeItem((item.name || "").slice(0, 16)) +
      ((item.name || "").length > 16 ? "..." : ""),
    [],
  );

  const getSize = useCallback(
    (item: Inventory) => (item.size || 24) + (item.unit || "pcs"),
    [],
  );

  return (
    <SellItemProviderContext.Provider
      value={{ items, addItem, emptyItems, getName, formatName, getSize }}
    >
      {children}
    </SellItemProviderContext.Provider>
  );
};
export default SellItemProvider;

export const useSellItemProvider = () => {
  const context = useContext(SellItemProviderContext);
  if (!context) {
    throw new Error(
      "useSellItemProvider must be used within a SellItemProviderProvider",
    );
  }
  return context;
};
