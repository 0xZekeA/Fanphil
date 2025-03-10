import { useSalesProvider } from "@/providers/sales/SalesProvider";
import { isToday } from "@/utils/dates";
import { useMemo } from "react";

const useSalesInfoHooks = () => {
  const { sales } = useSalesProvider();

  const todaysSales = useMemo(() => {
    return sales.filter((sale) => isToday(sale.created_at || ""));
  }, [sales]);

  const salesTotal = (todaysSales || []).length;

  return { salesTotal };
};

export default useSalesInfoHooks;
