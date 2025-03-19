import CustomButton from "@/components/customButton";
import { getSpecificTransferItems } from "@/database/transferItem";
import { ReturnItem } from "@/types/transferHistory";
import { Scale } from "@/utils/scaling";
import { useCallback, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { useHistoryListProvider } from "../../hooks/HistoryListProvider";
import useItemDetsHooks from "../../hooks/itemDets.hooks";
import styles from "../../styles/styles";
import SoldListItems from "./SoldListItem";

const TrfItems = ({ onClose }: { onClose: () => void }) => {
  const [items, setItems] = useState<TransferItem[] | ReturnItem[] | null>(
    null,
  );

  const { selectedItem } = useHistoryListProvider();
  const { isReturn } = useItemDetsHooks();

  const transferItems = useCallback(async () => {
    if (!selectedItem) return;
    if (isReturn(selectedItem)) {
      const item = [
        {
          inventory_id: selectedItem.item_id,
          quantity_moved: selectedItem.quantity,
        },
      ];
      setItems(item);
      return;
    }
    const trfItems =
      (await getSpecificTransferItems(
        (selectedItem as InventoryTransfer)?.id || "",
      )) || [];
    setItems(trfItems);
  }, [isReturn, selectedItem]);

  useEffect(() => {
    if (!items) transferItems();
  }, [items, transferItems]);

  if (!selectedItem) return null;

  return (
    <View style={{ width: "100%" }}>
      {/* Section title */}
      <View
        style={styles.confirmActionHeader}
        className="flex-col items-center"
      >
        <Text
          style={styles.textBase}
          className="font-JakartaMedium text-center"
        >
          Items Transferred
        </Text>
      </View>

      {/* Content section */}
      <View
        style={{
          rowGap: Scale.moderate(16),
          paddingBottom: Scale.moderate(24),
        }}
      >
        {items ? (
          items.map((item, index) => <SoldListItems key={index} item={item} />)
        ) : (
          <Text>Can't find any items. Try again later</Text>
        )}
      </View>

      {/* Close button */}
      <View
        style={{ width: "100%", paddingHorizontal: Scale.moderate(24) }}
        className="flex-row items-center justify-center"
      >
        <CustomButton title="Close" onPress={onClose} />
      </View>
    </View>
  );
};

export default TrfItems;
