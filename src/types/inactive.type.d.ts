import { Dispatch, SetStateAction } from "react";
import { ContextMenuTypes } from "./inventory.type";

interface PopUpsProviderContextTypes {
  contextMenu: ContextMenuTypes;
  setContextMenu: Dispatch<SetStateAction<ContextMenuTypes>>;
  setIsMessageShown: Dispatch<SetStateAction<boolean>>;
  isMessageShown: boolean;
  position: { x: number; y: number };
  showMessage: (event: any) => void;
  onClose: () => void;
  message: string;
  menuItems: any;
  onOpen: (item: Inventory, event: any) => void;
  reactivateItem: () => Promise<void>;
  isConfirmOption: boolean;
  setIsConfirmOption: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
}

interface InactiveHooksProviderContextTypes {
  inactiveItems: Inventory[];
  filteredInactiveItems: Inventory[];
  getSyncedIndicatorColor: (item: Inventory) => string;
  formatName: (item: Inventory) => string;
  getSize: (item: Inventory) => string;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}
