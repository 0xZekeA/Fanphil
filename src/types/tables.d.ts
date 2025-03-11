type UUID = string;

type Expense = {
  id: UUID;
  reason: string;
  cost: number;
  created_by: UUID;
  last_edited_by: UUID;
  created_at: string;
  updated_at: string;
  synced_at: string | null;
  deleted: boolean;
};

type Inventory = {
  id: UUID;
  name: string;
  quantity: number;
  cost_price: number;
  original_selling_price: number;
  selling_price: number;
  increment: number;
  is_active: boolean;
  last_edited_by: UUID;
  created_by: UUID;
  created_at: string;
  updated_at: string;
  synced_at: string | null;
  deleted: boolean;
};

type InventoryTransfer = {
  id: UUID;
  transferred_by: UUID;
  received_by: UUID;
  created_at: string;
  synced_at: string | null;
  deleted: boolean;
};

type Sale = {
  id: UUID;
  quantity: number;
  sold_by: UUID;
  total_price: number;
  last_edited_by: UUID;
  created_at: string;
  updated_at: string;
  synced_at: string | null;
  deleted: boolean;
};

type SoldItem = {
  id: UUID;
  sales_id: UUID;
  item_id: UUID;
  quantity: number;
  total_price: number;
  last_edited_by: UUID;
  created_at: string;
  updated_at: string;
  synced_at: string | null;
  deleted: boolean;
};

type SellersInventory = {
  id: UUID;
  inventory_id: UUID;
  seller: UUID;
  quantity_at_hand: number;
  created_at: string;
  updated_at: string;
  synced_at: string | null;
  deleted: boolean;
};

type TransferItem = {
  id: UUID;
  inventory_id: UUID;
  transfer_id: UUID;
  quantity_moved: number;
  last_edited_by: UUID;
  created_at: string;
  updated_at: string;
  synced_at: string | null;
  deleted: boolean;
};

type User = {
  id: UUID;
  full_name: string;
  email: string;
  phone_number: string;
  role: "Creator" | "Manager" | "Driver" | "Owner";
  is_active: boolean;
  pfp: string;
  address: string;
  created_at: string;
  created_by: UUID;
  updated_at: string;
  synced_at: string | null;
  deleted: boolean;
};
