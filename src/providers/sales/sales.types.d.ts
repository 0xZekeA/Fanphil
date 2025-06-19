interface SalesProviderContextTypes {
  sales: Sale[];
  soldItems: SoldItem[];
  customers: Customer[];
  customersMap: Map<string, Customer>;
  salesMapBySoldId: Map<string, Sale[]>;
  salesMap: Map<string, Sale>;
  soldItemsMapBySalesId: Map<string, SoldItem[]>;
}
