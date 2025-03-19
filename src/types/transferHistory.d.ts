import { Dispatch, SetStateAction } from "react";

interface ReturnItem {
  inventory_id: string;
  quantity_moved: number;
}

interface HistoryListProviderContextTypes {
  data: (InventoryTransfer | Return)[];
  selectedItem: InventoryTransfer | Return | null;
  setSelectedItem: Dispatch<SetStateAction<InventoryTransfer | Return | null>>;
}
