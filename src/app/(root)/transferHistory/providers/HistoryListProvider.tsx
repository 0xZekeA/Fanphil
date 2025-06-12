import { useInventoryProvider } from "@/providers/inventory/InventoryProvider";
import { HistoryListProviderContextTypes } from "@/types/transferHistory";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from "react";

const HistoryListProviderContext = createContext<
  HistoryListProviderContextTypes | undefined
>(undefined);

const HistoryListProvider = ({ children }: PropsWithChildren) => {
  const { inventoryTransfer, returns } = useInventoryProvider();

  const [selectedItem, setSelectedItem] = useState<
    InventoryTransfer | Return | null
  >(null);

  const data: (InventoryTransfer | Return)[] = useMemo(
    () =>
      [...inventoryTransfer, ...returns].sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      ),
    [inventoryTransfer, returns],
  );

  return (
    <HistoryListProviderContext.Provider
      value={{ data, selectedItem, setSelectedItem }}
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
