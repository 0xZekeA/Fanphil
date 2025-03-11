import { Dispatch, SetStateAction } from "react";

interface InventorySearchProviderContextTypes {
  search: string;
  setSearch: (text: string) => void;
  searchActive: boolean;
  activateSearch: () => void;
  deactivateSearch: () => void;
  filteredInventoryItems: Inventory[];
  searchBarStyle: object;
  overlayStyle: object;
  listStyle: object;
  onPress: (item: Inventory) => void;
}

declare interface ContextMenuTypes {
  visible: boolean;
  position: { x: number; y: number };
  selectedItem: any;
}

interface MenuProviderContextTypes {
  contextMenu: ContextMenuTypes;
  setContextMenu: Dispatch<SetStateAction<ContextMenuTypes>>;
  menuItems: any;
  onOpenMenuItems: (item: Inventory, event: any) => void;
  onOpenMenuOptions: (event: any) => void;
  isConfirmOption: boolean;
  setIsConfirmOption: Dispatch<SetStateAction<boolean>>;
  deactivateItem: () => void;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

interface InventoryListProviderContextTypes {
  getSyncedIndicatorColor: (item: Inventory) => string;
  formatName: (item: Inventory) => string;
  getSize: (item: Inventory) => string;
  inventoryData: Inventory[];
  setIsEightShown: Dispatch<SetStateAction<boolean>>;
  isEightShown: boolean;
  isLongerThanEight: boolean;
  onPress: (item: Inventory) => void;
}
