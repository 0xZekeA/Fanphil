import { useFinanceProvider } from "@/providers/finances/FinanceProvider";
import { useSalesProvider } from "@/providers/sales/SalesProvider";
import { FinancialDataTypes } from "@/types/finances.types";
import { getLast30DaysData } from "@/utils/financialHelpers";
import { useState } from "react";

const useFinanceHooks = () => {
  const { sales } = useSalesProvider();
  const { expenses } = useFinanceProvider();
  const [isExpanded, setIsExpanded] = useState(false);

  // 30 day expenses for investors and founder
  const expensesData30Days =
    (getLast30DaysData(expenses) as Expense[])?.map((expense, index) => {
      if ("reason" in expense) {
        return {
          initial: expense.reason,
          later: expense.cost,
        };
      }
      return null;
    }) ?? [];

  const sales30Days = getLast30DaysData(sales ?? []);

  // 30 day expenses
  const expenses30Days = (
    getLast30DaysData(expenses ?? []) as Expense[]
  )?.reduce((a, e) => {
    if ("amount" in e) {
      return a + e.cost;
    }
    return a;
  }, 0);

  const transactions30Days = (getLast30DaysData(sales ?? []) as Sale[])?.reduce(
    (a, t) => {
      if ("amount" in t) {
        return a + t.total_price;
      }
      return a;
    },
    0,
  );

  const allTimeProfit = sales?.reduce((a, t) => a + t.profit, 0) ?? 0;

  // Breakdown/expenses data
  const expenseData: FinancialDataTypes[] | null = expensesData30Days.filter(
    (data) => data !== null,
  );

  const breakDown = isExpanded ? expenseData : expenseData.slice(0, 6);

  //Manager's financial data

  // Investor's financials
  const financialData: FinancialDataTypes[] = [
    {
      initial: "Last 30 days expenses:",
      later: expenses30Days ?? 0,
    },
    {
      initial: "Last 30 days revenue:",
      later: transactions30Days ?? 0,
      profit: true,
    },
    {
      initial: "All time profit:",
      later: allTimeProfit.toString().startsWith("-") ? 0 : allTimeProfit ?? 0,
      profit: true,
    },
    {
      initial: "Sales completed(30 days):",
      later: sales30Days.length ?? 0,
      notCash: true,
    },
    { initial: "Pending Share:", later: 1220000, profit: true },
  ];

  return {
    breakDown,
    financialData,
    isExpanded,
    setIsExpanded,
  };
};

export default useFinanceHooks;
