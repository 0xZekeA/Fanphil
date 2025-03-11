import { useInventoryProvider } from "@/providers/inventory/InventoryProvider";
import { COLORS } from "@/utils/colors";
import { useCallback, useState } from "react";

import { InventoryListProviderContextTypes } from "@/types/inventory.type";
import { capitalizeItem } from "@/utils/capitalize";
import { router } from "expo-router";
import { createContext, PropsWithChildren, useContext } from "react";

const InventoryListProviderContext = createContext<
  InventoryListProviderContextTypes | undefined
>(undefined);

const InventoryListProvider = ({ children }: PropsWithChildren) => {
  const [isEightShown, setIsEightShown] = useState(true);

  const { filteredInventory } = useInventoryProvider();

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

  const inventoryData = isEightShown
    ? filteredInventory.slice(0, 8)
    : filteredInventory;

  const onPress = (item: Inventory) =>
    router.push({ pathname: "/(root)/inventoryItem", params: { id: item.id } });

  const isLongerThanEight = (filteredInventory || []).length > 8;

  return (
    <InventoryListProviderContext.Provider
      value={{
        getSyncedIndicatorColor,
        formatName,
        getSize,
        inventoryData,
        setIsEightShown,
        isEightShown,
        isLongerThanEight,
        onPress,
      }}
    >
      {children}
    </InventoryListProviderContext.Provider>
  );
};
export default InventoryListProvider;

export const useInventoryListProvider = () => {
  const context = useContext(InventoryListProviderContext);
  if (!context) {
    throw new Error(
      "useInventoryListProvider must be used within a InventoryListProviderProvider",
    );
  }
  return context;
};
