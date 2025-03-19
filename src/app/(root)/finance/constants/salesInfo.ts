import { SalesInfo } from "@/types/sales.type";

const getCardData = (salesInfo: SalesInfo, isAdmin: boolean) => {
  const data = [
    {
      id: "deposits",
      title: "Deposits",
      value: salesInfo.dayDeposits,
      icon: "wallet-outline",
      isProfit: false,
    },
    {
      id: "loans",
      title: "Loans",
      value: salesInfo.loans,
      icon: "cash-outline",
      isProfit: false,
    },
  ];

  if (isAdmin) {
    data.push({
      id: "profit",
      title: "Assumed Profit",
      value: salesInfo.assumedProfit,
      icon: "trending-up",
      isProfit: true,
    });
  }
  return data;
};

export default getCardData;
