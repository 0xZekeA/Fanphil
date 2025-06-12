import { createContext, PropsWithChildren, useContext } from "react";
import { useSupastashData } from "supastash";

const SalesProviderContext = createContext<
  SalesProviderContextTypes | undefined
>(undefined);

const SalesProvider = ({ children }: PropsWithChildren) => {
  const { data: sales } = useSupastashData<Sale>("sales");
  const { data: soldItems } = useSupastashData<SoldItem>("sold_items");
  const { data: customers } = useSupastashData<Customer>("customers");

  return (
    <SalesProviderContext.Provider value={{ sales, soldItems, customers }}>
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
