import { Dispatch, SetStateAction } from "react";

type FilteredInventory = {
  id: UUID;
  name: string;
  size: number;
  unit: string;
  synced_at: string | null;
  quantity_at_hand: number;
  selling_price: number;
  cost_price: number;
  last_edited_by: UUID;
  created_by: UUID;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

interface SellersInventoryListProviderContextTypes {
  getSyncedIndicatorColor: (item: FilteredInventory) => string;
  formatName: (item: FilteredInventory) => string;
  getSize: (item: FilteredInventory) => string;
  filteredSellersInventory: FilteredInventory[] | null;
  setIsEightShown: Dispatch<SetStateAction<boolean>>;
  isEightShown: boolean;
  isLongerThanEight: boolean;
  onPress: (item: FilteredInventory) => void;
  selectedSeller: User;
  setSelectedSeller: Dispatch<SetStateAction<User>>;
  setCurrentItem: Dispatch<SetStateAction<FilteredInventory | null>>;
  currentItem: FilteredInventory | null;
  loading: boolean;
  handleUpdate: (quantity: number) => void;
  quantity: number | null;
  setQuantity: Dispatch<SetStateAction<number | null>>;
}
