import { useFinanceProvider } from "@/providers/finances/FinanceProvider";
import { useSalesProvider } from "@/providers/sales/SalesProvider";
import { getLast30DaysData } from "@/utils/financialHelpers";
import { useCallback, useMemo } from "react";

const useFinancesHooks = () => {
  const { expenses } = useFinanceProvider();
  const { sales } = useSalesProvider();

  const expenses30Days = getLast30DaysData(expenses ?? [])?.reduce((a, e) => {
    if ("cost" in e) {
      return a + e.cost;
    }
    return a;
  }, 0);
  const transactions30Days = getLast30DaysData(sales ?? [])?.reduce((a, t) => {
    if ("total_price" in t) {
      return a + t.profit;
    }
    return a;
  }, 0);

  const total = (transactions30Days ?? 0) + (expenses30Days ?? 0);

  const calculation = useCallback(
    (amount: number) => {
      return (amount / total) * 100 || (!transactions30Days ? 1 : 0);
    },
    [total, transactions30Days],
  );

  const expensePercentage = useMemo(() => {
    const result = expenses30Days ? calculation(expenses30Days) : 0;
    return result ?? 0;
  }, [calculation, expenses30Days]);
  const incomePercentage = useMemo(() => {
    const result = transactions30Days ? calculation(transactions30Days) : 0;
    return result ?? 0;
  }, [calculation, transactions30Days]);

  return { expensePercentage, incomePercentage };
};

export default useFinancesHooks;
