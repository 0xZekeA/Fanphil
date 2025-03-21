import { getDb } from "@/database/database";
import { useInventoryProvider } from "@/providers/inventory/InventoryProvider";
import { useSalesProvider } from "@/providers/sales/SalesProvider";
import { showToast } from "@/utils/notification";
import * as MediaLibrary from "expo-media-library";
import { useCallback, useEffect, useRef, useState } from "react";
import { captureRef } from "react-native-view-shot";

const useReceiptHooks = (salesId: string) => {
  const { inventory } = useInventoryProvider();
  const { customers } = useSalesProvider();

  const [totalAmount, setTotalAmount] = useState(0);
  const [creditTotal, setCreditTotal] = useState(0);
  const [receiptNumber] = useState(() =>
    Math.floor(1000 + Math.random() * 9000),
  );
  const [sale, setSale] = useState<Sale | null>(null);
  const [selectedItems, setSelectedItems] = useState<SoldItem[] | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const receiptRef = useRef(null);

  const findSoldItems = useCallback(async () => {
    const db = await getDb();

    const items: SoldItem[] | null = await db.getAllAsync(
      "SELECT * FROM sold_items WHERE sales_id = ?",
      [salesId],
    );
    console.log("now");
    if (items) setSelectedItems(items);
  }, [salesId]);

  const findSale = useCallback(async () => {
    const db = await getDb();
    const s: Sale | null = await db.getFirstAsync(
      "SELECT * FROM sales WHERE id = ?",
      [salesId],
    );
    if (s) setSale(s);
  }, [salesId]);

  const depositedAmount = ((sale as Sale) || {})?.deposit ?? 0;
  const selectedCustomer = customers.find(
    (c) => c.id === (sale?.customer_id ?? ""),
  );

  useEffect(() => {
    if (!sale) findSale();
    if (!selectedItems || selectedItems.length < 1) findSoldItems();
  }, [findSale, findSoldItems, sale, selectedItems]);

  useEffect(() => {
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const saveReceiptToGallery = async () => {
    try {
      if (!hasPermission) {
        showToast(
          "error",
          "Please allow app to access your photos in settings",
        );
        return;
      }
      const uri = await captureRef(receiptRef, { format: "png", quality: 1 });

      const asset = await MediaLibrary.createAssetAsync(uri);
      await MediaLibrary.createAlbumAsync("Receipts", asset, false);

      showToast("success", "Receipt saved to your gallery!");
    } catch (error: any) {
      showToast(
        "error",
        "Failed to save receipt",
        `Error details: ${error.message}`,
      );
    }
  };

  useEffect(() => {
    // Filter items with no qty
    const validItems = selectedItems?.filter((item) => item.quantity > 0) || [];

    // Total
    const total =
      validItems?.reduce((sum, item) => {
        const inventoryItem = inventory.find((inv) => inv.id === item.item_id);
        const itemPrice = inventoryItem
          ? inventoryItem.selling_price * item.quantity
          : 0;
        return sum + itemPrice;
      }, 0) || 0;

    setTotalAmount(total);

    // Credit calc
    const depositNum = Number(depositedAmount) || 0;
    setCreditTotal(depositNum < total ? total - depositNum : 0);
  }, [selectedItems, depositedAmount, inventory]);

  return {
    totalAmount,
    creditTotal,
    receiptNumber,
    depositedAmount,
    selectedCustomer,
    selectedItems,
    sale,
    saveReceiptToGallery,
    receiptRef,
  };
};

export default useReceiptHooks;
