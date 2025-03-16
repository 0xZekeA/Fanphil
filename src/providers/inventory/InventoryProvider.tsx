import { createContext, PropsWithChildren, useContext } from "react";
import useRealtimeData from "../realtimeData";

const InventoryProviderContext = createContext<
  InventoryProviderContextTypes | undefined
>(undefined);

const InventoryProvider = ({ children }: PropsWithChildren) => {
  const inventory = useRealtimeData("inventory");
  const returns = useRealtimeData("returns");
  const inventoryTransfer = useRealtimeData("inventory_transfers");
  const sellersInventory = useRealtimeData("sellers_inventory");
  const transferItems = useRealtimeData("transfer_items");
  const filteredInventory = inventory.filter(
    (i) => i.deleted !== 1 && i.is_active !== 0,
  );

  return (
    <InventoryProviderContext.Provider
      value={{
        inventory,
        filteredInventory,
        inventoryTransfer,
        returns,
        sellersInventory,
        transferItems,
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
