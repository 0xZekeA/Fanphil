import { Dispatch, SetStateAction } from "react";
import { ContextMenuTypes } from "./inventory.type";

interface MenuProviderContextTypes {
  contextMenu: ContextMenuTypes;
  setContextMenu: Dispatch<SetStateAction<ContextMenuTypes>>;
  menuItems: any;
  onOpenMenuOptions: (event: any) => void;
  isSalesInterface: boolean;
  setIsSalesInterface: Dispatch<SetStateAction<boolean>>;
}

interface SellItemFormProviderContextTypes {
  startHoldAction: (id: string, type: "INCREASE" | "DECREASE") => void;
  handleDecrease: (id: string, amount?: number) => void;
  handleRemoveItem: (id: string) => void;
  handleIncrease: (id: string, amount?: number) => void;
  filteredInventory: Inventory[];
  error: string | null;
  holdInterval: number | null;
  selectedCustomer: Customer;
  selectedItems: Item[];
  setSelectedCustomer: Dispatch<SetStateAction<Customer>>;
  getItemQuantity: (id: string) => number;
  stopHoldAction: () => void;
  bottomSheetRef: React.RefObject<BottomSheetMethods>;
  openSheet: () => void;
  closeSheet: () => void;
  selectedInventoryItems: Inventory[];
  isSheetOpen: boolean;
  submitSale: () => void;
  depositedAmount: string;
  handleChange: (value: string, isAddDeposit?: boolean, item?: Sale) => void;
  total: number;
}

interface SalesInfo {
  dayDeposits: number;
  loans: number;
  assumedProfit: number;
}

interface SalesDataProviderContextTypes {
  getStatus: (item: Sale) => {
    color: string;
    message: string;
  };
  formatName: (item: Sale) => string;
  salesData: Sale[];
  isOwingFiltered: boolean;
  setIsOwingFiltered: Dispatch<SetStateAction<boolean>>;
  setIsEightShown: Dispatch<SetStateAction<boolean>>;
  isEightShown: boolean;
  isLongerThanEight: boolean;
  onPress: (item: Sale) => void;
  salesInfo: SalesInfo;
  setSelectedItem: Dispatch<SetStateAction<Sale | null>>;
  selectedItem: Sale | null;
  setAddedDeposit: Dispatch<SetStateAction<string>>;
  addedDeposit: string;
  addNewDeposit: () => void;
  isNewDate: (index: number, item: Sale) => boolean;
}
