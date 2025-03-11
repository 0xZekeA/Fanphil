export const getLast30DaysData = (
  data: Sale[] | Expense[] | SellersInventory[] | TransferItem[],
) => {
  if (!data || data.length < 1) {
    return [];
  }
  data.filter((d) => !d.deleted);

  const now = new Date();
  const dateLast30Days = new Date(now);
  dateLast30Days.setDate(now.getDate() - 30);

  const filteredData = data.filter((d) => {
    const createdDate = new Date(d.created_at);
    return createdDate >= dateLast30Days;
  });

  return filteredData;
};
