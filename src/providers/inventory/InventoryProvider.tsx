import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import { useSupastashData } from "supastash";

const InventoryProviderContext = createContext<
  InventoryProviderContextTypes | undefined
>(undefined);

const InventoryProvider = ({ children }: PropsWithChildren) => {
  const {
    data: inventory,
    dataMap: inventoryMap,
    groupedBy: inventoryGroups,
  } = useSupastashData<Inventory>("inventory", {
    extraMapKeys: ["is_active"],
  });
  const { data: returns } = useSupastashData<Return>("returns");
  const { data: inventoryTransfer } = useSupastashData<InventoryTransfer>(
    "inventory_transfers",
  );
  const { data: sellersInventory } =
    useSupastashData<SellersInventory>("sellers_inventory");
  const { data: purchases } = useSupastashData<Purchase>("purchases");
  const { data: transferItems } =
    useSupastashData<TransferItem>("transfer_items");
  const filteredInventory = useMemo(
    () => inventoryGroups?.is_active?.get(1) || [],
    [inventoryGroups],
  );

  return (
    <InventoryProviderContext.Provider
      value={{
        inventory,
        inventoryMap,
        filteredInventory,
        inventoryTransfer,
        returns,
        sellersInventory,
        transferItems,
        purchases,
      }}
    >
      {children}
    </InventoryProviderContext.Provider>
  );
};
export default InventoryProvider;

export const useInventoryProvider = () => {
  const context = useContext(InventoryProviderContext);
  if (!context) {
    throw new Error(
      "useInventoryProvider must be used within a InventoryProviderProvider",
    );
  }
  return context;
};
