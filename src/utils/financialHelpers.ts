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

export const formatToKAndM = (num: number) => {
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  } else if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return num.toString();
};

export const formatToLocaleString = (num: number) => {
  return num.toLocaleString();
};
