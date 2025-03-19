import { Dispatch, SetStateAction } from "react";

interface ReturnItem {
  inventory_id: string;
  quantity_moved: number;
}

interface HistoryListProviderContextTypes {
  data: Purchase[];
  selectedItem: Purchase | null;
  setSelectedItem: Dispatch<SetStateAction<Purchase | null>>;
  items: PurchasedItem[] | null;
  purchasedItems: () => Promise<void>;
  getPurchaseItemsLength: (item: Purchase) => Promise<number>;
  onCloseModal: () => void;
}
