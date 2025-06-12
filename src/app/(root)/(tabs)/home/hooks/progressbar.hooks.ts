import { useInventoryProvider } from "@/providers/inventory/InventoryProvider";
import { getLast30DaysData } from "@/utils/financialHelpers";
import { useMemo } from "react";
import { DimensionValue } from "react-native";

const useProgressbarHooks = () => {
  const { sellersInventory, transferItems } = useInventoryProvider();

  const thirtyDaysTransferredItems = getLast30DaysData(transferItems || []);

  const inventoryQty = useMemo(() => {
    return (
      sellersInventory
        .filter((d) => d.deleted_at === null)
        .reduce((a, b) => a + b.quantity_at_hand, 0) || 0
    );
  }, [sellersInventory]);
  const movedItemsQty = useMemo(
    () =>
      thirtyDaysTransferredItems.reduce(
        (a, b) => a + (b as TransferItem).quantity_moved,
        0,
      ) || 1,
    [thirtyDaysTransferredItems],
  );

  const percentage: DimensionValue =
    ((movedItemsQty - inventoryQty) / movedItemsQty) * 100;

  const is100 = percentage === 100;

  return { inventoryQty, movedItemsQty, percentage, is100 };
};

export default useProgressbarHooks;
