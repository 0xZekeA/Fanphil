import { useInventoryProvider } from "@/providers/inventory/InventoryProvider";
import { Action, Item } from "@/types/transfer.type";
import { Dispatch, Reducer, SetStateAction, useReducer, useState } from "react";
import reducer from "../../utils/reducer";

const useAddActionsHooks = (
  setError: Dispatch<SetStateAction<string | null>>,
) => {
  const { inventoryMap } = useInventoryProvider();

  const [selectedItems, dispatch] = useReducer<
    Reducer<Map<string, Item>, Action>
  >(reducer, new Map());
  const [holdInterval, setHoldInterval] = useState<
    NodeJS.Timeout | number | null
  >(null);

  const handleIncrease = (id: string, amount = 1) => {
    const inventoryItem = inventoryMap.get(id);
    const item = selectedItems.get(id);

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
    const item = selectedItems.get(id);
    return item ? item.quantity : 0;
  };

  return {
    holdInterval,
    stopHoldAction,
    getItemQuantity,
    startHoldAction,
    handleDecrease,
    handleIncrease,
    selectedItems,
    dispatch,
  };
};

export default useAddActionsHooks;
