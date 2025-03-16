import { useInventoryProvider } from "@/providers/inventory/InventoryProvider";
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface HistoryListProviderContextTypes {
  data: (InventoryTransfer | Return)[];
  selectedItem: InventoryTransfer | Return | null;
  setSelectedItem: Dispatch<SetStateAction<InventoryTransfer | Return | null>>;
}

const HistoryListProviderContext = createContext<
  HistoryListProviderContextTypes | undefined
>(undefined);

const HistoryListProvider = ({ children }: PropsWithChildren) => {
  const { inventoryTransfer, returns } = useInventoryProvider();

  const [selectedItem, setSelectedItem] = useState<
    InventoryTransfer | Return | null
  >(null);

  const data: (InventoryTransfer | Return)[] = [
    ...inventoryTransfer,
    ...returns,
  ].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
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
