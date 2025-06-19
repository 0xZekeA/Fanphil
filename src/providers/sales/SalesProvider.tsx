import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import { useSupastashData } from "supastash";

const SalesProviderContext = createContext<
  SalesProviderContextTypes | undefined
>(undefined);

const SalesProvider = ({ children }: PropsWithChildren) => {
  const {
    data: sales,
    dataMap: salesMap,
    groupedBy,
  } = useSupastashData<Sale>("sales", {
    extraMapKeys: ["sold_by"],
  });
  const { data: soldItems, groupedBy: soldItemsGroups } =
    useSupastashData<SoldItem>("sold_items", {
      extraMapKeys: ["sales_id"],
    });
  const { data: customers, dataMap: customersMap } =
    useSupastashData<Customer>("customers");

  const salesMapBySoldId = useMemo(() => {
    return groupedBy?.sold_by ?? new Map();
  }, [groupedBy]);

  const soldItemsMapBySalesId = useMemo(() => {
    return soldItemsGroups?.sales_id ?? new Map();
  }, [soldItemsGroups]);

  return (
    <SalesProviderContext.Provider
      value={{
        sales,
        soldItems,
        customers,
        customersMap,
        salesMapBySoldId,
        salesMap,
        soldItemsMapBySalesId,
      }}
    >
      {children}
    </SalesProviderContext.Provider>
  );
};
export default SalesProvider;

export const useSalesProvider = () => {
  const context = useContext(SalesProviderContext);
  if (!context) {
    throw new Error(
      "useSalesProvider must be used within a SalesProviderProvider",
    );
  }
  return context;
};
