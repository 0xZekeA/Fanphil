import { useInventoryProvider } from "@/providers/inventory/InventoryProvider";
import { useLocalSearchParams } from "expo-router";
import { createContext, PropsWithChildren, useContext } from "react";
interface ItemProviderContextTypes {
  item: Inventory | undefined;
}

const ItemProviderContext = createContext<ItemProviderContextTypes | undefined>(
  undefined,
);

const ItemProvider = ({ children }: PropsWithChildren) => {
  const { id } = useLocalSearchParams();
  const { inventoryMap } = useInventoryProvider();

  const item = inventoryMap.get(id as string);

  return (
    <ItemProviderContext.Provider value={{ item }}>
      {children}
    </ItemProviderContext.Provider>
  );
};
export default ItemProvider;

export const useItemProvider = () => {
  const context = useContext(ItemProviderContext);
  if (!context) {
    throw new Error(
      "useItemProvider must be used within a ItemProviderProvider",
    );
  }
  return context;
};
