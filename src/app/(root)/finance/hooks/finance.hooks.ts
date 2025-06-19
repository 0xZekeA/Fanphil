import { useFinanceProvider } from "@/providers/finances/FinanceProvider";
import { useSalesProvider } from "@/providers/sales/SalesProvider";
import { FinancialDataTypes } from "@/types/finances.types";
import { useMemo, useState } from "react";

const useFinanceHooks = () => {
  const { sales } = useSalesProvider();
  const { expenses } = useFinanceProvider();
  const [isExpanded, setIsExpanded] = useState(false);

  const expensesData = useMemo(() => {
    const today = new Date();
    const thirtyDaysAgo = new Date(today.setDate(today.getDate() - 30));
    const expensesData30Days = [];
    let expenses30Days = 0;
    let allTimeExpenses = 0;
    for (const expense of expenses) {
      if (new Date(expense.created_at) >= thirtyDaysAgo) {
        expensesData30Days.push({
          initial: expense.reason,
          later: expense.cost,
        });
        expenses30Days += expense.cost;
      }
      allTimeExpenses += expense.cost;
    }

    return {
      expensesData30Days,
      expenses30Days,
      allTimeExpenses,
    };
  }, [expenses]);

  const salesData = useMemo(() => {
    const today = new Date();
    const thirtyDaysAgo = new Date(today.setDate(today.getDate() - 30));
    const salesData30Days = [];
    let sales30Days = 0;
    let allTimeSales = 0;
    let dayDeposits = 0;
    let totalSales = 0;
    let profit = 0;
    for (const sale of sales) {
      if (new Date(sale.created_at).getTime() >= today.setHours(0, 0, 0, 0)) {
        dayDeposits += sale.deposit;
        totalSales += sale.total_price;
        profit += sale.profit;
      }
      if (new Date(sale.created_at) >= thirtyDaysAgo) {
        salesData30Days.push(sale);
        sales30Days += sale.deposit;
      }
      allTimeSales += sale.deposit;
    }
    const loans = totalSales - dayDeposits;

    return {
      salesData30Days,
      sales30Days,
      allTimeSales,
      dayDeposits,
      loans,
      profit,
      totalSales,
    };
  }, [sales]);

  // Sale overview calculations
  const salesInfo = useMemo(
    () => ({
      dayDeposits: salesData.dayDeposits,
      loans: salesData.loans,
      assumedProfit: salesData.profit,
    }),
    [salesData],
  );

  const isInProfit = useMemo(
    () =>
      !(salesData.dayDeposits - expensesData.allTimeExpenses || 0)
        .toString()
        .startsWith("-"),
    [salesData.dayDeposits, expensesData.allTimeExpenses],
  );

  const breakDown = useMemo(
    () =>
      isExpanded
        ? expensesData.expensesData30Days
        : expensesData.expensesData30Days.slice(0, 6),
    [isExpanded, expensesData.expensesData30Days],
  );

  // Investor's financials
  const financialData: FinancialDataTypes[] = [
    {
      initial: "Last 30 days expenses:",
      later: expensesData.expenses30Days ?? 0,
    },
    {
      initial: "Last 30 days revenue:",
      later: salesData.sales30Days ?? 0,
      profit: true,
    },
    {
      initial: "All time profit:",
      later: Math.abs(salesData.profit - expensesData.allTimeExpenses),
      profit: isInProfit,
    },
    {
      initial: "Sales completed(30 days):",
      later: salesData.salesData30Days.length,
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
