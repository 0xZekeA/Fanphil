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
  deleted_at: string | null;
};

type Inventory = {
  id: UUID;
  name: string;
  quantity: number;
  stock?: number;
  cost_price: number;
  original_selling_price: number;
  selling_price: number;
  size: number;
  unit: string;
  increment: number;
  is_active: 0 | 1;
  last_edited_by: UUID;
  created_by: UUID;
  created_at: string;
  updated_at: string;
  synced_at: string | null;
  deleted_at: string | null;
};

type InventoryTransfer = {
  id: UUID;
  transferred_by: UUID;
  received_by: UUID;
  created_at: string;
  synced_at: string | null;
  deleted_at: string | null;
};

type Sale = {
  id: UUID;
  quantity: number;
  profit: number;
  customer_id: UUID;
  deposit: number;
  sold_by: UUID;
  total_price: number;
  last_edited_by: UUID;
  created_at: string;
  updated_at: string;
  synced_at: string | null;
  deleted_at: string | null;
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
  deleted_at: string | null;
};

type SellersInventory = {
  id: UUID;
  item_id: UUID;
  seller: UUID;
  quantity_at_hand: number;
  created_at: string;
  updated_at: string;
  synced_at: string | null;
  deleted_at: string | null;
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
  deleted_at: string | null;
};

type User = {
  id: UUID;
  full_name: string;
  email: string;
  phone_number: string;
  role: "Creator" | "Manager" | "Driver" | "Owner";
  is_active: 1 | 0;
  pfp: string;
  address: string;
  created_at: string;
  created_by: UUID;
  updated_at: string;
  synced_at: string | null;
  deleted_at: string | null;
};

type Return = {
  id: UUID;
  created_at: string;
  updated_at: string;
  seller: UUID;
  item_id: UUID;
  quantity: number;
  returned_by: UUID;
};

type Customer = {
  id: UUID;
  name: string;
  phone: string | null;
  address: string | null;
  created_at: string;
  updated_at: string;
  is_active: 1 | 0;
  synced_at: string | null;
  deleted_at: string | null;
};

type Purchase = {
  id: string;
  purchased_by?: string | null;
  created_at: string;
  updated_at?: string | null;
  synced_at: string | null;
  deleted_at: string | null;
};

type PurchasedItem = {
  id: string;
  inventory_id?: string | null;
  purchase_id?: string | null;
  quantity: number;
  last_edited_by?: string | null;
  updated_at?: string | null;
  created_at: string;
  synced_at: string | null;
  deleted_at: string | null;
};
