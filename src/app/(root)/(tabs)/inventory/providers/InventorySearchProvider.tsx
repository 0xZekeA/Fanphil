import { useInventoryProvider } from "@/providers/inventory/InventoryProvider";
import { InventorySearchProviderContextTypes } from "@/types/inventory.type";
import { COLORS } from "@/utils/colors";
import { router } from "expo-router";
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from "react";
import { Dimensions, Keyboard } from "react-native";
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const { height } = Dimensions.get("window");

const InventorySearchProviderContext = createContext<
  InventorySearchProviderContextTypes | undefined
>(undefined);

const InventorySearchProvider = ({ children }: PropsWithChildren) => {
  const { filteredInventory } = useInventoryProvider();

  const [search, setSearch] = useState("");
  const [searchActive, setSearchActive] = useState(false);

  const searchBarY = useSharedValue(0);
  const overlayOpacity = useSharedValue(0);

  const overlayStyle = useAnimatedStyle(() => ({
    backgroundColor: `rgba(255, 255, 255, ${overlayOpacity.value})`,
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 996,
    opacity: withTiming(overlayOpacity.value, { duration: 600 }),
  }));

  const searchBarStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: withTiming(searchBarY.value, {
          duration: 300,
          easing: Easing.out(Easing.ease),
        }),
      },
    ],
    top: searchActive ? 16 : 0,
    zIndex: 999,
  }));

  const listStyle = useAnimatedStyle(() => ({
    position: "absolute",
    top: withTiming(searchActive ? 120 : height, {
      duration: 500,
    }),
    left: 0,
    width: "100%",
    height: height - 40,
    backgroundColor: COLORS.white,
    zIndex: 998,
  }));

  const filteredInventoryItems = useMemo(() => {
    if (!filteredInventory) return [];
    const searchTerm = search.toLowerCase();
    if (searchTerm.length === 0) {
      return filteredInventory;
    }
    const filtered: Inventory[] = [];
    filteredInventory.forEach((item) => {
      if (
        item.name.toLowerCase().includes(searchTerm) ||
        item.unit.toLowerCase().includes(searchTerm)
      ) {
        filtered.push(item);
      }
    });
    return filtered;
  }, [search, filteredInventory]);

  const activateSearch = () => {
    setSearchActive(true);
    overlayOpacity.value = withTiming(1, { duration: 600 });
    searchBarY.value = withTiming(-20, {
      duration: 300,
      easing: Easing.out(Easing.ease),
    });
  };

  const deactivateSearch = () => {
    setSearchActive(false);
    setSearch("");
    overlayOpacity.value = withTiming(0, { duration: 600 });
    searchBarY.value = withTiming(0, {
      duration: 300,
      easing: Easing.out(Easing.ease),
    });
    Keyboard.dismiss();
  };

  const onPress = (item: Inventory) => {
    deactivateSearch();
    router.push({ pathname: "/(root)/inventoryItem", params: { id: item.id } });
  };

  return (
    <InventorySearchProviderContext.Provider
      value={{
        search,
        setSearch,
        searchActive,
        activateSearch,
        deactivateSearch,
        filteredInventoryItems,
        searchBarStyle,
        overlayStyle,
        listStyle,
        onPress,
      }}
    >
      {children}
    </InventorySearchProviderContext.Provider>
  );
};
export default InventorySearchProvider;

export const useInventorySearchProvider = () => {
  const context = useContext(InventorySearchProviderContext);
  if (!context) {
    throw new Error(
      "useInventorySearchProvider must be used within a InventorySearchProviderProvider",
    );
  }
  return context;
};
