import { useFinanceProvider } from "@/providers/finances/FinanceProvider";
import { useSalesProvider } from "@/providers/sales/SalesProvider";
import { useCallback, useState } from "react";

const useFinancesHooks = () => {
  const { expenses } = useFinanceProvider();
  const { sales } = useSalesProvider();

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isMessageShown, setIsMessageShown] = useState(false);

  const totalExpenses = expenses?.reduce((a, e) => {
    if ("cost" in e) {
      return a + e.cost;
    }
    return a;
  }, 0);
  const totalTransactions = sales?.reduce((a, t) => {
    if ("total_price" in t) {
      return a + t.profit;
    }
    return a;
  }, 0);

  const total = (totalTransactions ?? 0) + (totalExpenses ?? 0);

  const calculation = useCallback((amount: number) => {
    return (amount / total) * 100 || 0;
  }, []);

  const expensePercentage = calculation(totalExpenses);
  const incomePercentage = calculation(totalTransactions);

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
