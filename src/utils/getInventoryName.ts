export const getInventoryItemName = (
  id: string,
  inventoryMap: Map<string, Inventory>,
) => {
  return inventoryMap.get(id)?.name || "Item";
};
