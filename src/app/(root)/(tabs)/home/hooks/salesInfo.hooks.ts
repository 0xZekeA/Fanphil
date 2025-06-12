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

  const toISO = (date: string | null) => {
    if (!date) return 0;

    return new Date(date).getTime();
  };

  const sortedSales = useMemo(
    () =>
      sales
        .filter((sale) => sale.deleted_at === null)
        .sort((a, b) => toISO(a.created_at) - toISO(b.created_at))
        .slice(0, 4),
    [sales],
  );

  const salesTotal = (todaysSales || []).length;

  return { salesTotal, sortedSales };
};

export default useSalesInfoHooks;
