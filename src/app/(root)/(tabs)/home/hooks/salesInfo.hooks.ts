import { useSalesProvider } from "@/providers/sales/SalesProvider";
import { isToday } from "@/utils/dates";
import { useMemo } from "react";

const useSalesInfoHooks = () => {
  const { sales } = useSalesProvider();

  const todaysSales = useMemo(() => {
    return sales.filter(
      (sale) => sale.deleted_at === null && isToday(sale.created_at || ""),
    );
  }, [sales]);

  const sortedSales = useMemo(() => sales?.slice(0, 4), [sales]);

  const salesTotal = (todaysSales || []).length;

  return { salesTotal, sortedSales };
};

export default useSalesInfoHooks;
