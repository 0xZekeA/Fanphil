export const getInventoryItemName = (id: string, inventory: Inventory[]) => {
  return inventory.find((i) => i.id === id)?.name || "Item";
};
