import { createContext, PropsWithChildren, useContext } from "react";
import useRealtimeData from "../realtimeData";

const SellerDetsProviderContext = createContext<
  SellerDetsProviderContextTypes | undefined
>(undefined);

const SellerDetsProvider = ({ children }: PropsWithChildren) => {
  const sellersInventory = useRealtimeData("sellers_inventory");
  const transferItems = useRealtimeData("transfer_items");

  return (
    <SellerDetsProviderContext.Provider
      value={{ sellersInventory, transferItems }}
    >
      {children}
    </SellerDetsProviderContext.Provider>
  );
};
export default SellerDetsProvider;

export const useSellerDetsProvider = () => {
  const context = useContext(SellerDetsProviderContext);
  if (!context) {
    throw new Error(
      "useSellerDetsProvider must be used within a SellerDetsProviderProvider",
    );
  }
  return context;
};
