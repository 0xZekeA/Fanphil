import { useInventoryProvider } from "@/providers/inventory/InventoryProvider";
import { InactiveHooksProviderContextTypes } from "@/types/inactive.type";
import { capitalizeItem } from "@/utils/capitalize";
import { COLORS } from "@/utils/colors";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

const InactiveHooksProviderContext = createContext<
  InactiveHooksProviderContextTypes | undefined
>(undefined);

const InactiveHooksProvider = ({ children }: PropsWithChildren) => {
  const { inventory } = useInventoryProvider();

  const [search, setSearch] = useState("");

  const inactiveItems = useMemo(
    () => inventory.filter((item) => item.is_active === 0),
    [inventory],
  );

  const getSyncedIndicatorColor = useCallback(
    (item: Inventory) =>
      (item.synced_at || "").length > 1 || item.synced_at === undefined
        ? COLORS.mint500
        : COLORS.pastel200,
    [],
  );

  const formatName = useCallback(
    (item: Inventory) =>
      capitalizeItem((item.name || "").slice(0, 15)) +
      ((item.name || "").length > 15 ? "..." : ""),
    [],
  );

  const getSize = useCallback(
    (item: Inventory) => (item.size || 24) + (item.unit || "pcs"),
    [],
  );

  const filteredInactiveItems = useMemo(() => {
    if (!inactiveItems) return [];
    const searchTerm = search.toLowerCase();
    if (searchTerm.length === 0) {
      return inactiveItems;
    }
    const filtered = [];
    for (const item of inactiveItems) {
      if (
        item.name?.toLowerCase().includes(searchTerm) ||
        item.size?.toString().includes(searchTerm) ||
        item.unit?.toLowerCase().includes(searchTerm)
      ) {
        filtered.push(item);
      }
    }
    return filtered;
  }, [search, inactiveItems]);

  return (
    <InactiveHooksProviderContext.Provider
      value={{
        inactiveItems,
        filteredInactiveItems,
        getSyncedIndicatorColor,
        formatName,
        getSize,
        search,
        setSearch,
      }}
    >
      {children}
    </InactiveHooksProviderContext.Provider>
  );
};
export default InactiveHooksProvider;

export const useInactiveHooksProvider = () => {
  const context = useContext(InactiveHooksProviderContext);
  if (!context) {
    throw new Error(
      "useInactiveHooksProvider must be used within a InactiveHooksProviderProvider",
    );
  }
  return context;
};
