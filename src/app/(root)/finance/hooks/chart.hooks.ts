import { useFinanceProvider } from "@/providers/finances/FinanceProvider";
import { useSalesProvider } from "@/providers/sales/SalesProvider";
import { getLast30DaysData } from "@/utils/financialHelpers";
import { useCallback, useState } from "react";

const useFinancesHooks = () => {
  const { expenses } = useFinanceProvider();
  const { sales } = useSalesProvider();

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isMessageShown, setIsMessageShown] = useState(false);

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

  const calculation = useCallback((amount: number) => {
    return (amount / total) * 100 || 0;
  }, []);

  const expensePercentage = calculation(expenses30Days);
  const incomePercentage = calculation(transactions30Days);

  const showMessage = (event: any) => {
    setPosition({
      x: event.nativeEvent.pageX,
      y: event.nativeEvent.pageY,
    });
    setIsMessageShown(true);
  };

  const onClose = () => {
    setIsMessageShown(false);
  };

  const message = `Hi, ${
    incomePercentage > expensePercentage
      ? `we're up with a ${incomePercentage.toString().slice(0, 2)}% profit! 🚀`
      : "we're in a bit of a dip, but bouncing back soon! 🔄"
  }`;

  return {
    expensePercentage,
    incomePercentage,
    showMessage,
    onClose,
    isMessageShown,
    position,
    message,
  };
};

export default useFinancesHooks;
