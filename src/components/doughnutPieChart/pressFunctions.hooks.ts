import { useCallback, useState } from "react";

const usePressFunctions = (
  onPress: (...arg: any[]) => void,
  onSegmentPress?: (data: DataItem) => void,
) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleSegmentPress = useCallback(
    (data: DataItem) => {
      onSegmentPress?.(data);
    },
    [onSegmentPress],
  );

  const handlePressIn = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const handlePressOut = useCallback(
    (event: any) => {
      setActiveIndex(null);
      onPress(event);
    },
    [onPress],
  );

  return { activeIndex, handleSegmentPress, handlePressIn, handlePressOut };
};

export default usePressFunctions;
