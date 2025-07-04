import { createContext, PropsWithChildren, useContext } from "react";
import { useSupastashData } from "supastash";

const FinanceProviderContext = createContext<
  FinanceProviderContextTypes | undefined
>(undefined);

const FinanceProvider = ({ children }: PropsWithChildren) => {
  const { data: expenses } = useSupastashData<Expense>("expenses");

  return (
    <FinanceProviderContext.Provider value={{ expenses }}>
      {children}
    </FinanceProviderContext.Provider>
  );
};
export default FinanceProvider;

export const useFinanceProvider = () => {
  const context = useContext(FinanceProviderContext);
  if (!context) {
    throw new Error(
      "useFinanceProvider must be used within a FinanceProviderProvider",
    );
  }
  return context;
};
