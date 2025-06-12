interface InventoryProviderContextTypes {
  inventory: Inventory[];
  inventoryMap: Map<string, Inventory>;
  filteredInventory: Inventory[];
  inventoryTransfer: InventoryTransfer[];
  returns: Return[];
  sellersInventory: SellersInventory[];
  transferItems: TransferItem[];
  purchases: Purchase[];
}
