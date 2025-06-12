import { addSale } from "@/database/sales";
import { addSoldItem } from "@/database/soldItem";
import { useAuthProvider } from "@/providers/auth";
import { useInventoryProvider } from "@/providers/inventory/InventoryProvider";
import { Action, Item } from "@/types/transfer.type";
import { showToast } from "@/utils/notification";
import { Dispatch, SetStateAction, useState } from "react";
import { useSalesDataProvider } from "../SalesDataProvider";

const useSubmitHooks = (
  selectedCustomer: Customer,
  selectedItems: Item[],
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
        if (total < Number(value)) {
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

  const total = selectedItems.reduce((a, b) => {
    const price = inventoryMap.get(b.id)?.selling_price ?? 0;
    return a + b.quantity * price;
  }, 0);

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

    const profit = selectedItems.reduce((a, b) => {
      const sp = inventoryMap.get(b.id)?.selling_price ?? 0;
      const cp = inventoryMap.get(b.id)?.cost_price ?? 0;
      const difference = sp - cp;
      return a + b.quantity * difference;
    }, 0);

    try {
      const sId = await addSale(
        selectedItems.length || 1,
        user.id,
        selectedCustomer.id,
        total,
        Number(depositedAmount),
        profit,
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

      const id = await Promise.all(
        selectedItems
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
    total,
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
