import { useCallback, useRef, useState } from "react";

const useRemoveItemsHooks = (initialQuantity: number) => {
  const [removedQuantity, setRemovedQuantity] = useState(0);
  const holdInterval = useRef<number | null>(null);

  const handleDecrease = () => {
    setRemovedQuantity((prev) => Math.max(prev - 1, 0));
  };

  const getRemainingQuantity = () =>
    Math.max(initialQuantity - removedQuantity, 0);

  const handleIncrease = useCallback(() => {
    setRemovedQuantity((prev) => Math.min(prev + 1, initialQuantity));
  }, [initialQuantity]);

  const startHoldAction = useCallback(
    (action: "INCREASE" | "DECREASE") => {
      let speed = 50;

      const performAction = () => {
        if (action === "DECREASE") handleDecrease();
        else handleIncrease();

        speed = Math.max(50, speed - 50);
        if (holdInterval.current) clearInterval(holdInterval.current);
        holdInterval.current = setInterval(performAction, speed);
      };

      holdInterval.current = setInterval(performAction, speed);
    },
    [handleIncrease],
  );

  const stopHoldAction = () => {
    if (holdInterval.current) clearInterval(holdInterval.current);
  };

  const resetRemovedQuantity = () => {
    setRemovedQuantity(0);
  };

  return {
    removedQuantity,
    getRemainingQuantity,
    handleIncrease,
    handleDecrease,
    startHoldAction,
    stopHoldAction,
    resetRemovedQuantity,
  };
};

export default useRemoveItemsHooks;
