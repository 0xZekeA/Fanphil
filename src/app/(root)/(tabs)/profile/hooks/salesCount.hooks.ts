import { useAuthProvider } from "@/providers/auth";
import { useSalesProvider } from "@/providers/sales/SalesProvider";
import { useMemo } from "react";

const useSalesCountHooks = () => {
  const { isAdmin, user } = useAuthProvider();
  const { sales } = useSalesProvider();

  const filteredSalesAmount = (
    sales.filter((s) => s.sold_by === user?.id) || []
  ).length;

  const salesCount = useMemo(() => {
    if (isAdmin || user?.role === "Manager")
      return `Overseen ${(sales || []).length} ${
        (sales || []).length === 1 ? "sale" : "sales"
      }`;
    return `${filteredSalesAmount} ${
      filteredSalesAmount === 1 ? "sale" : "sales"
    }`;
  }, [filteredSalesAmount, isAdmin, sales, user?.role]);

  return { salesCount };
};

export default useSalesCountHooks;
