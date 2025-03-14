import { useState } from "react";

const useFinanceRefresh = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refresh = async () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return { isRefreshing, refresh };
};

export default useFinanceRefresh;
