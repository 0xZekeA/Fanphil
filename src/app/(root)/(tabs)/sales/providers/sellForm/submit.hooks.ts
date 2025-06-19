import { addSale } from "@/database/sales";
import { addSoldItem } from "@/database/soldItem";
import { useAuthProvider } from "@/providers/auth";
import { useInventoryProvider } from "@/providers/inventory/InventoryProvider";
import { Action, Item } from "@/types/transfer.type";
import { showToast } from "@/utils/notification";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { useSalesDataProvider } from "../SalesDataProvider";

const useSubmitHooks = (
  selectedCustomer: Customer,
  selectedItems: Map<string, Item>,
  setError: Dispatch<SetStateAction<string | null>>,
  dispatch: Dispatch<Action>,
) => {
  const { user } = useAuthProvider();
  const { inventoryMap } = useInventoryProvider();
  const { setAddedDeposit } = useSalesDataProvider();

  const [salesId, setSalesId] = useState<string | null>(null);
  const [isSaleCompleted, setIsSaleCompleted] = useState(false);
  const [isReceiptShown, setIsReceiptShown] = useState(false);
  const [depositedAmount, setDepositedAmount] = useState("0");

  const details = useMemo(() => {
    const selectedItemsArray = Array.from(selectedItems.values());
    let totalSellingPrice = 0;
    let totalCostPrice = 0;
    let total = 0;
    for (const item of selectedItemsArray) {
      const sellingPrice = inventoryMap.get(item.id)?.selling_price ?? 0;
      const costPrice = inventoryMap.get(item.id)?.cost_price ?? 0;
      totalSellingPrice += item.quantity * sellingPrice;
      totalCostPrice += item.quantity * costPrice;
      total += item.quantity * sellingPrice;
    }
    const profit = totalSellingPrice - totalCostPrice;
    return {
      totalSellingPrice,
      totalCostPrice,
      total,
      profit,
    };
  }, [inventoryMap, selectedItems]);

  const handleChange = (value: string, isAddDeposit?: boolean, item?: Sale) => {
    if (/^-?\d*$/.test(value)) {
      if (isAddDeposit && item) {
        const difference = item.total_price - item.deposit;
        if (difference < Number(value)) {
          showToast(
            "error",
            "Deposit is higher than the difference",
            ` Just ₦${difference.toLocaleString()} is left`,
          );
          return;
        }
        setAddedDeposit(value);
      } else {
        if (details.total < Number(value)) {
          showToast("error", "Deposit is higher than the total");
          return;
        }
        setDepositedAmount(value);
      }
      setError("");
    } else {
      setError("Amount must contain only digits and an optional '-' sign");
    }
  };

  const submitSale = async () => {
    if (!selectedCustomer) {
      showToast("error", "Please add a driver from the Staff screen");
      return;
    }
    if (!selectedItems) {
      showToast("error", "Please make sure an item is selected");
      return;
    }

    if (!user) {
      showToast("error", "App may require a restart", "Contact developer");
      return;
    }

    try {
      const sId = await addSale(
        selectedItems.size || 1,
        user.id,
        selectedCustomer.id,
        details.total,
        Number(depositedAmount),
        details.profit,
      );

      const totalItemPrice = (item: Item) => {
        const price = inventoryMap.get(item.id)?.selling_price ?? 0;
        return item.quantity * price;
      };

      const isAdminOrMgr =
        user.role === "Creator" ||
        user.role === "Manager" ||
        user.role === "Owner";

      if (!sId) return;
      setSalesId(sId);

      const selectedItemsArray = Array.from(selectedItems.values());

      const id = await Promise.all(
        selectedItemsArray
          .filter((item) => item.quantity > 0)
          .map((item) =>
            addSoldItem(
              isAdminOrMgr,
              sId,
              item.id,
              item.quantity,
              totalItemPrice(item),
              user.id,
            ),
          ),
      );

      if (id.length < 1) {
        showToast("error", "Operation failed", "Contact admin");
        return;
      }
      showToast(
        "success",
        `Sale to ${selectedCustomer.name} completed successfully`,
      );
      setTimeout(() => {
        setDepositedAmount("0");
        setIsReceiptShown(true);
        setIsSaleCompleted(true);
      }, 1000);
      dispatch({ type: "CLEAR_ITEMS" });
    } catch (error: any) {
      console.error(error);
      showToast(
        "error",
        "An unexpected error occured",
        `Error details: ${error.message}`,
      );
    }
  };

  return {
    total: details.total,
    submitSale,
    salesId,
    isSaleCompleted,
    isReceiptShown,
    depositedAmount,
    setDepositedAmount,
    handleChange,
    setIsSaleCompleted,
    setIsReceiptShown,
  };
};

export default useSubmitHooks;
