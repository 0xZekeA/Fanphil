import LongPressButton from "@/components/longPressButton";
import { fetchSoldItems } from "@/database/sold-item";
import { COLORS } from "@/utils/colors";
import { Scale } from "@/utils/scaling";
import { useCallback, useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useSalesDataProvider } from "../../hooks/SalesDataProvider";
import styles from "../../styles/styles";
import SoldListItems from "./SoldListItem";

const ConfirmAction = ({ onClose }: { onClose: () => void }) => {
  const [isViewItems, setIsViewItems] = useState(false);
  const [items, setItems] = useState<SoldItem[] | null>(null);

  const { selectedItem, addNewDeposit } = useSalesDataProvider();

  const soldItems = useCallback(async () => {
    const soldItem = (await fetchSoldItems(selectedItem?.id || "")) || [];
    setItems(soldItem);
  }, [selectedItem]);

  useEffect(() => {
    if (!items) soldItems();
  }, [items, soldItems]);

  return (
    selectedItem && (
      <View>
        <TouchableOpacity onPress={() => setIsViewItems(!isViewItems)}>
          <Text style={[styles.textMed, { color: COLORS.indigo900 }]}>
            {isViewItems ? "Add Deposit" : "View Sold Items"}
          </Text>
        </TouchableOpacity>
        <View
          style={styles.confirmActionHeader}
          className="flex-col items-center"
        >
          <Text
            style={styles.textBase}
            className="font-JakartaMedium text-center"
          >
            {isViewItems ? "Sold Items" : "Add Deposit"}
          </Text>
        </View>
        <View style={{ rowGap: Scale.moderate(16) }}>
          {isViewItems &&
            (items ? (
              items?.map((item, index) => (
                <SoldListItems key={index} item={item} />
              ))
            ) : (
              <Text>Can't find any items. Try again later</Text>
            ))}
        </View>
        <View
          style={{ width: "100%", paddingHorizontal: Scale.moderate(24) }}
          className="flex-row items-center justify-between"
        >
          <TouchableOpacity
            style={{ paddingLeft: Scale.moderate(20) }}
            onPress={onClose}
          >
            <Text
              style={[styles.textMed, { color: COLORS.gray400 }]}
              className={`font-Jakarta`}
            >
              {isViewItems ? "Close" : "Cancel"}
            </Text>
          </TouchableOpacity>
          {!isViewItems && (
            <LongPressButton
              closeModal={onClose}
              onLongPressComplete={addNewDeposit}
              text="Confirm"
              destructive
            />
          )}
        </View>
      </View>
    )
  );
};

export default ConfirmAction;
