import { useSalesProvider } from "@/providers/sales/SalesProvider";
import { COLORS } from "@/utils/colors";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
} from "react";
interface CustomersProviderContextTypes {
  customers: Customer[];
  getSyncedIndicatorColor: (item: Customer) => string;
}

const CustomersProviderContext = createContext<
  CustomersProviderContextTypes | undefined
>(undefined);

const CustomersProvider = ({ children }: PropsWithChildren) => {
  const { customers: customersData } = useSalesProvider();

  const customers = useMemo(
    () => customersData.filter((c) => c.is_active === 1),
    [customersData],
  );

  const getSyncedIndicatorColor = useCallback(
    (item: Customer) =>
      (item.synced_at || "").length > 1 || item.synced_at === undefined
        ? COLORS.mint500
        : COLORS.pastel200,
    [],
  );

  return (
    <CustomersProviderContext.Provider
      value={{
        customers,
        getSyncedIndicatorColor,
      }}
    >
      {children}
    </CustomersProviderContext.Provider>
  );
};
export default CustomersProvider;

export const useCustomersProvider = () => {
  const context = useContext(CustomersProviderContext);
  if (!context) {
    throw new Error(
      "useCustomersProvider must be used within a CustomersProviderProvider",
    );
  }
  return context;
};
