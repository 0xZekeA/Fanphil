import { addDeposit } from "@/database/sales";
import { useAuthProvider } from "@/providers/auth";
import { useSalesProvider } from "@/providers/sales/SalesProvider";
import { SalesDataProviderContextTypes } from "@/types/sales.type";
import { capitalizeItem } from "@/utils/capitalize";
import { COLORS } from "@/utils/colors";
import { formatDate } from "@/utils/formatDate";
import { showToast } from "@/utils/notification";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

const SalesDataProviderContext = createContext<
  SalesDataProviderContextTypes | undefined
>(undefined);

const SalesDataProvider = ({ children }: PropsWithChildren) => {
  const [isEightShown, setIsEightShown] = useState(true);
  const [selectedItem, setSelectedItem] = useState<Sale | null>(null);
  const [addedDeposit, setAddedDeposit] = useState("0");
  const [isOwingFiltered, setIsOwingFiltered] = useState(false);

  const { sales: salesItems, customers } = useSalesProvider();
  const { isAdmin, user } = useAuthProvider();

  // Sort sales according to most recent
  const sales = useMemo(
    () =>
      salesItems?.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      ),
    [salesItems],
  );

  // Filter todays sales
  const otherStaffSales = useMemo(
    () =>
      sales.filter(
        (s) =>
          new Date(s.created_at).getDate() === new Date().getDate() ||
          s.total_price > s.deposit,
      ),
    [sales],
  );
  const todaysSales = useMemo(
    () =>
      sales.filter(
        (s) => new Date(s.created_at).getDate() === new Date().getDate(),
      ),
    [sales],
  );

  const filteredSales = isAdmin ? sales : otherStaffSales;
  const owing = useMemo(
    () => sales.filter((s) => s.total_price > s.deposit),
    [sales],
  );
  const salesData = useMemo(
    () =>
      isOwingFiltered
        ? owing
        : isEightShown
        ? filteredSales.slice(0, 8)
        : filteredSales,
    [isOwingFiltered, isEightShown, filteredSales, owing],
  );

  const getStatus = useCallback(
    (item: Sale) => ({
      color:
        item.deposit < item.total_price ? COLORS.softCoral900 : COLORS.mint900,
      message: item.deposit < item.total_price ? "OWING" : "FULL PAYMENT",
    }),
    [],
  );

  // Sale overview calculations
  const dayDeposits = useMemo(
    () => todaysSales?.reduce((a, b) => a + (b.deposit || 0), 0) ?? 0,
    [todaysSales],
  );
  const loans = useMemo(
    () =>
      (todaysSales?.reduce((a, b) => a + (b.total_price || 0), 0) ?? 0) -
      dayDeposits,
    [todaysSales, dayDeposits],
  );
  const assumedProfit = useMemo(
    () => todaysSales?.reduce((a, b) => a + (b.profit || 0), 0) ?? 0,
    [todaysSales],
  );

  const salesInfo = useMemo(
    () => ({
      dayDeposits,
      loans,
      assumedProfit,
    }),
    [dayDeposits, loans, assumedProfit],
  );
  // Format Customer name
  const formatName = useCallback(
    (item: Sale) => {
      const name =
        customers.find((c) => item.customer_id === c.id)?.name ?? "Customer461";
      return (
        capitalizeItem(name.slice(0, 15)) + (name.length > 15 ? "..." : "")
      );
    },
    [customers],
  );

  const onPress = (item: Sale) => {
    if (!isAdmin || item.sold_by !== user?.id) {
      showToast("error", "Only the creator or an admin can edit this sale");
      return;
    }
    setSelectedItem(item);
  };

  const isLongerThanEight = (filteredSales || []).length > 8;

  const addNewDeposit = async () => {
    if (addedDeposit === "0" || !addedDeposit) {
      showToast("error", "Please type in a value");
    }
    if (!selectedItem || !user) return;
    try {
      const id = await addDeposit(
        Number(addedDeposit) + selectedItem.deposit,
        selectedItem.id,
        user.id,
      );

      const message = addedDeposit.startsWith("-")
        ? "₦" +
          Number(addedDeposit.split("-")[1]) +
          " was subtracted from the sale successfully"
        : "₦" +
          Number(addedDeposit).toLocaleString() +
          " was added to the sale successfully";

      if (id) {
        showToast("success", message);
      }
    } catch (error) {
      console.error(error);
      showToast("error", "Error while trying to perform this operation");
    }
  };

  const isNewDate = (index: number, item: Sale) => {
    if (index === 0) return true;
    const prevDate = formatDate(salesData[index - 1].created_at, "short");
    const itemDate = formatDate(item.created_at, "short");
    if (prevDate !== itemDate) return true;
    return false;
  };

  return (
    <SalesDataProviderContext.Provider
      value={{
        getStatus,
        formatName,
        salesData,
        setIsEightShown,
        isEightShown,
        isLongerThanEight,
        onPress,
        salesInfo,
        setSelectedItem,
        selectedItem,
        addedDeposit,
        setAddedDeposit,
        addNewDeposit,
        isOwingFiltered,
        setIsOwingFiltered,
        isNewDate,
      }}
    >
      {children}
    </SalesDataProviderContext.Provider>
  );
};
export default SalesDataProvider;

export const useSalesDataProvider = () => {
  const context = useContext(SalesDataProviderContext);
  if (!context) {
    throw new Error(
      "SalesDataProvider must be used within a SalesDataProviderProvider",
    );
  }
  return context;
};
