import { FilteredInventory } from "@/types/sellersInventory";
import { useEffect, useState } from "react";

type HoldActionType = "INCREASE" | "DECREASE";

export const useQuantityControl = (
  item: FilteredInventory,
  initialQuantity: number | null,
  setQuantity: (value: number) => void,
) => {
  const [holdInterval, setHoldInterval] = useState<number | null>(null);

  const handleIncrease = () => {
    setQuantity(Math.min(item.quantity_at_hand, (initialQuantity || 0) + 1));
  };

  const handleDecrease = () => {
    setQuantity(Math.max(0, (initialQuantity || 0) - 1));
  };

  const startHoldAction = (type: HoldActionType) => {
    setHoldInterval(
      setInterval(() => {
        if (type === "INCREASE") handleIncrease();
        else handleDecrease();
      }, 50),
    );
  };

  const stopHoldAction = () => {
    if (holdInterval) {
      clearInterval(holdInterval);
      setHoldInterval(null);
    }
  };

  const handleReset = () => {
    setQuantity(item.quantity_at_hand);
  };

  // Clean up interval when component unmounts
  useEffect(() => {
    return () => {
      if (holdInterval) {
        clearInterval(holdInterval);
      }
    };
  }, [holdInterval]);

  return {
    handleIncrease,
    handleDecrease,
    startHoldAction,
    stopHoldAction,
    handleReset,
  };
};
