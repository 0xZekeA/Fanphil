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

export const getDaysLeftInAMonth = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  const monthEnd = new Date(year, month + 1, 0);
  const daysInTheMonth = monthEnd.getDate();
  const currentDay = now.getDate();

  return daysInTheMonth - currentDay;
};

export const getDataFromStartOfMonth = (data: Sale[] | Expense[]) => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();

  const startOfMonth = new Date(currentYear, currentMonth, 1);

  const filteredData = data?.filter((d) => {
    const createdDate = new Date(d.created_at);
    return createdDate >= startOfMonth;
  });

  return filteredData;
};

export const calculatePercentage = (part: number, total: number): number => {
  if (total === 0) return 0;
  return (part / total) * 100;
};
