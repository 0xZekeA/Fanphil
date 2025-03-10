import { createContext, PropsWithChildren, useContext } from "react";
import useRealtimeData from "../realtimeData";

const SalesProviderContext = createContext<
  SalesProviderContextTypes | undefined
>(undefined);

const SalesProvider = ({ children }: PropsWithChildren) => {
  const sales = useRealtimeData("sales");
  const soldItems = useRealtimeData("sold_items");

  return (
    <SalesProviderContext.Provider value={{ sales, soldItems }}>
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
