import { FilteredInventory } from "@/types/sellersInventory";

const getFilteredSellersInventory = (
  sellersInventory: SellersInventory[],
  inventoryMap: Map<string, Inventory>,
  selectedSellerId: UUID | null,
): FilteredInventory[] => {
  if (!selectedSellerId) return [];
  const filteredSellersInventory = [];

  for (const sellerItem of sellersInventory) {
    if (sellerItem.seller === selectedSellerId) {
      const inventoryItem = inventoryMap.get(sellerItem.item_id || "");
      if (!inventoryItem) continue;
      filteredSellersInventory.push({
        id: inventoryItem.id,
        name: inventoryItem.name,
        size: inventoryItem.size,
        unit: inventoryItem.unit,
        synced_at: sellerItem.synced_at,
        quantity_at_hand: sellerItem.quantity_at_hand,
        selling_price: inventoryItem.selling_price,
        cost_price: inventoryItem.cost_price,
        last_edited_by: inventoryItem.last_edited_by,
        created_by: inventoryItem.created_by,
        created_at: inventoryItem.created_at,
        updated_at: inventoryItem.updated_at,
        deleted_at: inventoryItem.deleted_at,
      });
    }
  }

  return filteredSellersInventory;
};

export default getFilteredSellersInventory;
