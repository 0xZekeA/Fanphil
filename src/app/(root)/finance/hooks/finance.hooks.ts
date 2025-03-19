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

  // Sale overview calculations
  const dayDeposits = sales?.reduce((a, b) => a + (b.deposit || 0), 0) ?? 0;
  const loans =
    (sales?.reduce((a, b) => a + (b.total_price || 0), 0) ?? 0) - dayDeposits;
  const assumedProfit = sales?.reduce((a, b) => a + (b.profit || 0), 0) ?? 0;

  const salesInfo = {
    dayDeposits,
    loans,
    assumedProfit,
  };

  // 30 day expenses
  const expenses30Days = (
    getLast30DaysData(expenses ?? []) as Expense[]
  ).reduce((a, e) => a + e.cost, 0);

  const transactions30Days = (getLast30DaysData(sales ?? []) as Sale[])?.reduce(
    (a, t) => a + t.deposit,
    0,
  );

  const allTimeProfit =
    ((sales || [])?.reduce((a, t) => a + t.profit, 0) || 0) -
    ((expenses || []).reduce((a, b) => a + b.cost, 0) || 0);

  const isInProfit = !(allTimeProfit || 0).toString().startsWith("-");

  // Breakdown/expenses data
  const expenseData: FinancialDataTypes[] | null = expensesData30Days.filter(
    (data) => data !== null,
  );

  const breakDown = isExpanded ? expenseData : expenseData.slice(0, 6);

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
      later: Math.abs(allTimeProfit),
      profit: isInProfit,
    },
    {
      initial: "Sales completed(30 days):",
      later: (sales30Days || []).length,
      notCash: true,
    },
  ];

  return {
    breakDown,
    financialData,
    isExpanded,
    setIsExpanded,
    salesInfo,
  };
};

export default useFinanceHooks;
