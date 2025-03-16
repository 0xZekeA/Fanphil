import { addSale } from "@/database/sales";
import { addSoldItem } from "@/database/soldItem";
import { useAuthProvider } from "@/providers/auth";
import { useInventoryProvider } from "@/providers/inventory/InventoryProvider";
import { useSalesProvider } from "@/providers/sales/SalesProvider";
import { SellItemFormProviderContextTypes } from "@/types/sales.type";
import { Action, Item } from "@/types/transfer.type";
import { showToast } from "@/utils/notification";
import BottomSheet from "@gorhom/bottom-sheet";
import {
  createContext,
  PropsWithChildren,
  Reducer,
  useContext,
  useReducer,
  useRef,
  useState,
} from "react";
import reducer from "../utils/reducer";
import { useSalesDataProvider } from "./SalesDataProvider";

const SellItemFormProviderContext = createContext<
  SellItemFormProviderContextTypes | undefined
>(undefined);

const SellItemFormProvider = ({ children }: PropsWithChildren) => {
  const { filteredInventory } = useInventoryProvider();
  const { user } = useAuthProvider();
  const { customers } = useSalesProvider();
  const { setAddedDeposit } = useSalesDataProvider();

  const bottomSheetRef = useRef<BottomSheet>(null);

  const [selectedItems, dispatch] = useReducer<Reducer<Item[], Action>>(
    reducer,
    [],
  );

  const [depositedAmount, setDepositedAmount] = useState("0");
  const [selectedCustomer, setSelectedCustomer] = useState(customers[0]);
  const [error, setError] = useState<string | null>(null);
  const [holdInterval, setHoldInterval] = useState<number | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleIncrease = (id: string, amount = 1) => {
    const inventoryItem = filteredInventory.find((i) => i.id === id);
    const item = selectedItems.find((i) => i.id === id);

    if (!inventoryItem) return;

    if (!item) {
      dispatch({
        type: "ADD_ITEM",
        item: {
          id: inventoryItem.id,
          name: inventoryItem.name,
          stock: inventoryItem.quantity,
          quantity: 1,
        },
      });
    }
    if (item && item.quantity + amount > item.stock) {
      setError(`Cannot exceed stock (${item.quantity})`);
      return;
    }
    setError(null);
    dispatch({ type: "INCREASE", id, amount });
  };

  const handleDecrease = (id: string, amount = 1) => {
    dispatch({ type: "DECREASE", id, amount });
  };

  const startHoldAction = (id: string, type: "INCREASE" | "DECREASE") => {
    setHoldInterval(
      setInterval(() => {
        if (type === "INCREASE") handleIncrease(id, 5);
        else handleDecrease(id, 5);
      }, 50),
    );
  };

  const stopHoldAction = () => {
    if (holdInterval) clearInterval(holdInterval);
  };

  const getItemQuantity = (id: string) => {
    const item = selectedItems.find((item) => item.id === id);
    return item ? item.quantity : 0;
  };

  const openSheet = () => {
    setIsSheetOpen(true);
    bottomSheetRef.current?.expand();
  };
  const closeSheet = () => {
    setIsSheetOpen(false);
    bottomSheetRef.current?.close();
  };

  const handleRemoveItem = (id: string) => {
    dispatch({ type: "REMOVE_ITEM", id });
  };

  const total = selectedItems.reduce((a, b) => {
    const price =
      filteredInventory?.find((item) => item.id === b.id)?.selling_price ?? 0;
    return a + b.quantity * price;
  }, 0);

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
      const sp =
        filteredInventory?.find((item) => item.id === b.id)?.selling_price ?? 0;
      const cp =
        filteredInventory?.find((item) => item.id === b.id)?.cost_price ?? 0;
      const difference = sp - cp;
      return a + b.quantity * difference;
    }, 0);

    try {
      const salesId = await addSale(
        selectedItems.length || 1,
        user.id,
        selectedCustomer.id,
        total,
        Number(depositedAmount),
        profit,
      );

      const totalItemPrice = (item: Item) => {
        const price =
          filteredInventory?.find((i) => i.id === item.id)?.selling_price ?? 0;
        return item.quantity * price;
      };

      const isAdminOrMgr =
        user.role === "Creator" ||
        user.role === "Manager" ||
        user.role === "Owner";

      const id = await Promise.all(
        selectedItems
          .filter((item) => item.quantity > 0)
          .map((item) =>
            addSoldItem(
              isAdminOrMgr,
              salesId,
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

  const selectedInventoryItems = filteredInventory.filter((item) =>
    selectedItems.some((s) => s.id === item.id),
  );

  return (
    <SellItemFormProviderContext.Provider
      value={{
        startHoldAction,
        handleDecrease,
        handleIncrease,
        filteredInventory,
        error,
        holdInterval,
        selectedCustomer,
        setSelectedCustomer,
        getItemQuantity,
        stopHoldAction,
        bottomSheetRef,
        isSheetOpen,
        openSheet,
        closeSheet,
        selectedItems,
        selectedInventoryItems,
        submitSale,
        handleRemoveItem,
        depositedAmount,
        handleChange,
        total,
      }}
    >
      {children}
    </SellItemFormProviderContext.Provider>
  );
};
export default SellItemFormProvider;

export const useSellItemFormProvider = () => {
  const context = useContext(SellItemFormProviderContext);
  if (!context) {
    throw new Error(
      "SellItemFormProvider must be used within a SellItemFormProviderProvider",
    );
  }
  return context;
};
