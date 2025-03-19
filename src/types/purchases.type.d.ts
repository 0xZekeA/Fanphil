import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import React from "react";

type Item = { id: string; name: string; quantity: number; stock: number };

type Action =
  | { type: "ADD_ITEM"; item: Item }
  | { type: "INCREASE"; id: string; amount?: number }
  | { type: "DECREASE"; id: string; amount?: number }
  | { type: "REMOVE_ITEM"; id: string }
  | { type: "CLEAR_ITEMS" };

interface PurchasesFormProviderContextTypes {
  startHoldAction: (id: string, type: "INCREASE" | "DECREASE") => void;
  handleDecrease: (id: string, amount?: number) => void;
  handleRemoveItem: (id: string) => void;
  handleIncrease: (id: string, amount?: number) => void;
  filteredInventory: Inventory[];
  error: string | null;
  holdInterval: number | null;
  selectedItems: Item[];
  getItemQuantity: (id: string) => number;
  stopHoldAction: () => void;
  bottomSheetRef: React.RefObject<BottomSheetMethods>;
  openSheet: () => void;
  closeSheet: () => void;
  selectedInventoryItems: Inventory[];
  isSheetOpen: boolean;
  submitPurchase: () => void;
}

interface PurchasesProviderContextTypes {
  items: string[];
  addItem: (id: string) => void;
  emptyItems: () => void;
  getName: (id: string) => string;
  formatName: (id: Inventory) => string;
  getSize: (id: Inventory) => string;
}
