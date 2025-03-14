import { useCallback, useState } from "react";

const useRefreshHook = () => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800);
  }, []);

  return { refreshing, onRefresh };
};

export default useRefreshHook;
