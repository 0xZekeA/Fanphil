import { updateSellersInventory } from "@/database/inventory-transfers";
import { useAuthProvider } from "@/providers/auth";
import { useInventoryProvider } from "@/providers/inventory/InventoryProvider";
import { useUsersProvider } from "@/providers/users/UsersProvider";
import {
  FilteredInventory,
  SellersInventoryListProviderContextTypes,
} from "@/types/sellersInventory";
import { capitalizeItem } from "@/utils/capitalize";
import { COLORS } from "@/utils/colors";
import { showToast } from "@/utils/notification";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import getFilteredSellersInventory from "../utils/filterSellersInventory";

const SellersInventoryListProviderContext = createContext<
  SellersInventoryListProviderContextTypes | undefined
>(undefined);

const SellersInventoryListProvider = ({ children }: PropsWithChildren) => {
  const { sellers } = useUsersProvider();
  const { user } = useAuthProvider();
  const { sellersInventory, inventory } = useInventoryProvider();

  const [loading, setLoading] = useState(false);

  const [currentItem, setCurrentItem] = useState<FilteredInventory | null>(
    null,
  );
  const [quantity, setQuantity] = useState<number | null>(null);

  const [isEightShown, setIsEightShown] = useState(true);
  const [selectedSeller, setSelectedSeller] = useState(sellers[0]);

  const getSyncedIndicatorColor = useCallback(
    (item: FilteredInventory) =>
      (item.synced_at || "").length > 1 || item.synced_at === undefined
        ? COLORS.mint500
        : COLORS.pastel200,
    [],
  );

  useEffect(() => {
    if (quantity === null && currentItem !== null) {
      setQuantity(Number(currentItem.quantity_at_hand));
    }
  }, [currentItem, quantity]);

  const filteredInventory = getFilteredSellersInventory(
    sellersInventory,
    inventory,
    selectedSeller.id,
  );

  const formatName = useCallback(
    (item: FilteredInventory) =>
      capitalizeItem((item.name || "").slice(0, 15)) +
      ((item.name || "").length > 15 ? "..." : ""),
    [],
  );

  const getSize = useCallback(
    (item: FilteredInventory) => (item.size || 24) + (item.unit || "pcs"),
    [],
  );

  const filteredSellersInventory = filteredInventory
    ? isEightShown
      ? filteredInventory.slice(0, 8)
      : filteredInventory
    : null;

  const onPress = (item: FilteredInventory) => setCurrentItem(item);

  const isLongerThanEight = (filteredSellersInventory || []).length > 8;

  const handleUpdate = async (quantity: number) => {
    if (!selectedSeller || !currentItem || !quantity || !user) {
      showToast("error", "We've run into an issue", "Contact dev");
      return;
    }
    try {
      setLoading(true);
      const result = await updateSellersInventory(
        selectedSeller.id,
        currentItem.id,
        quantity,
        user.id,
      );
      if (result.success) {
        showToast("success", `${result.message}`);
      }
    } catch (error: any) {
      showToast(
        "error",
        "Failed to update new quantity",
        `Error details: ${error.message}`,
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SellersInventoryListProviderContext.Provider
      value={{
        getSyncedIndicatorColor,
        formatName,
        getSize,
        filteredSellersInventory,
        setIsEightShown,
        isEightShown,
        isLongerThanEight,
        onPress,
        setSelectedSeller,
        selectedSeller,
        currentItem,
        setCurrentItem,
        handleUpdate,
        loading,
        setQuantity,
        quantity,
      }}
    >
      {children}
    </SellersInventoryListProviderContext.Provider>
  );
};
export default SellersInventoryListProvider;

export const useSellersInventoryListProvider = () => {
  const context = useContext(SellersInventoryListProviderContext);
  if (!context) {
    throw new Error(
      "useSellersInventoryListProvider must be used within a SellersInventoryListProviderProvider",
    );
  }
  return context;
};
