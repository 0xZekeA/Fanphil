import { useSellerDetsProvider } from "@/providers/seller/SellerDetsProvider";
import { getLast30DaysData } from "@/utils/financialHelpers";
import { DimensionValue } from "react-native";

const useProgressbarHooks = () => {
  const { sellersInventory, transferItems } = useSellerDetsProvider();

  const thirtyDaysTransferredItems = getLast30DaysData(transferItems || []);

  const inventoryQty =
    sellersInventory
      .filter((d) => !d.deleted)
      .reduce((a, b) => a + b.quantity_at_hand, 0) || 0;
  const movedItemsQty =
    thirtyDaysTransferredItems.reduce(
      (a, b) => a + (b as TransferItem).quantity_moved,
      0,
    ) || 1;

  const percentage: DimensionValue =
    ((movedItemsQty - inventoryQty) / movedItemsQty) * 100;

  const is100 = percentage === 100;

  return { inventoryQty, movedItemsQty, percentage, is100 };
};

export default useProgressbarHooks;
