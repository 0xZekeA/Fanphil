import { useInventoryProvider } from "@/providers/inventory/InventoryProvider";
import { useSalesProvider } from "@/providers/sales/SalesProvider";
import { showToast } from "@/utils/notification";
import * as MediaLibrary from "expo-media-library";
import { useEffect, useMemo, useRef, useState } from "react";
import { captureRef } from "react-native-view-shot";

const useReceiptHooks = (salesId: string) => {
  const { inventoryMap } = useInventoryProvider();
  const { customersMap, soldItemsMapBySalesId, salesMap } = useSalesProvider();

  const [receiptNumber] = useState(() =>
    Math.floor(1000 + Math.random() * 9000),
  );
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const receiptRef = useRef(null);

  const selectedItems = useMemo(() => {
    return soldItemsMapBySalesId.get(salesId) || [];
  }, [soldItemsMapBySalesId, salesId]);

  const sale = useMemo(() => {
    return salesMap.get(salesId);
  }, [salesMap, salesId]);

  const totalDetails = useMemo(() => {
    let total = 0;
    for (const item of selectedItems) {
      if (item.quantity <= 0) continue;
      const inventoryItem = inventoryMap.get(item.item_id || "");
      const itemPrice = inventoryItem
        ? inventoryItem.selling_price * item.quantity
        : 0;
      total += itemPrice;
    }
    const depositedAmount = ((sale as Sale) || {})?.deposit ?? 0;
    const depositNum = Number(depositedAmount) || 0;
    const credit = depositNum < total ? total - depositNum : 0;
    return { total, credit, depositedAmount };
  }, [selectedItems, inventoryMap, sale]);

  const selectedCustomer = useMemo(
    () => customersMap.get(sale?.customer_id ?? ""),
    [customersMap, sale],
  );

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

  return {
    totalAmount: totalDetails.total,
    creditTotal: totalDetails.credit,
    receiptNumber,
    depositedAmount: totalDetails.depositedAmount,
    selectedCustomer,
    selectedItems,
    sale,
    saveReceiptToGallery,
    receiptRef,
  };
};

export default useReceiptHooks;
