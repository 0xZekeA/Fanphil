import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import React, { Dispatch, SetStateAction } from "react";
import { ContextMenuTypes } from "./inventory.type";

type Item = { id: string; name: string; quantity: number; stock: number };

type Action =
  | { type: "ADD_ITEM"; item: Item }
  | { type: "INCREASE"; id: string; amount?: number }
  | { type: "DECREASE"; id: string; amount?: number }
  | { type: "REMOVE_ITEM"; id: string }
  | { type: "CLEAR_ITEMS" };

interface MenuProviderContextTypes {
  contextMenu: ContextMenuTypes;
  setContextMenu: Dispatch<SetStateAction<ContextMenuTypes>>;
  menuItems: any;
  onOpen: (event: any) => void;
}

interface TransferFormProviderContextTypes {
  startHoldAction: (id: string, type: "INCREASE" | "DECREASE") => void;
  handleDecrease: (id: string, amount?: number) => void;
  handleRemoveItem: (id: string) => void;
  handleIncrease: (id: string, amount?: number) => void;
  filteredInventory: Inventory[];
  error: string | null;
  holdInterval: NodeJS.Timeout | number | null;
  selectedDriver: User;
  selectedItems: Map<string, Item>;
  setSelectedDriver: Dispatch<SetStateAction<User>>;
  getItemQuantity: (id: string) => number;
  stopHoldAction: () => void;
  bottomSheetRef: React.RefObject<BottomSheetMethods>;
  openSheet: () => void;
  closeSheet: () => void;
  handleSheetChange: (index: number) => void;
  selectedInventoryItems: Inventory[];
  isSheetOpen: boolean;
  submitTransfer: () => void;
}
