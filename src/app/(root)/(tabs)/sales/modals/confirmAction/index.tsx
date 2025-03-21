import CustomButton from "@/components/customButton";
import LongPressButton from "@/components/longPressButton";
import { fetchSoldItems } from "@/database/soldItem";
import { COLORS } from "@/utils/colors";
import { Scale } from "@/utils/scaling";
import { useCallback, useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useSalesDataProvider } from "../../providers/SalesDataProvider";
import styles from "../../styles/styles";
import AddDeposit from "./AddDeposit";
import CloseButton from "./CloseButton";
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

  if (!selectedItem) return null;
  const isPaidOff = selectedItem.deposit >= selectedItem.total_price;

  if (isPaidOff && !isViewItems) {
    setIsViewItems(true);
  }

  return (
    <View style={{ width: "100%" }}>
      {/* Header  */}
      {!isPaidOff && (
        <TouchableOpacity
          className="items-end"
          onPress={() => setIsViewItems(!isViewItems)}
        >
          <Text style={[styles.textMed, { color: COLORS.indigo900 }]}>
            {isViewItems ? "Add Deposit" : "Sold Items"}
          </Text>
        </TouchableOpacity>
      )}

      {/* Section title */}
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

      {/* Content section - conditionally rendered based on view mode */}
      {isViewItems ? (
        <View
          style={{
            rowGap: Scale.moderate(16),
            paddingBottom: Scale.moderate(24),
          }}
        >
          {items ? (
            items.map((item, index) => (
              <SoldListItems key={index} item={item} />
            ))
          ) : (
            <Text>Can't find any items. Try again later</Text>
          )}
        </View>
      ) : (
        <AddDeposit item={selectedItem} />
      )}

      {/* Action buttons */}
      <View
        style={styles.modalActionBtn}
        className={`flex-row items-center ${
          isViewItems ? "justify-center" : "justify-between"
        }`}
      >
        {!isViewItems && <CloseButton onClose={onClose} title="Cancel" />}
        {!isViewItems && (
          <LongPressButton
            closeModal={onClose}
            onLongPressComplete={addNewDeposit}
            text="Confirm"
          />
        )}
        {isViewItems && <CustomButton title="Close" onPress={onClose} />}
      </View>
    </View>
  );
};

export default ConfirmAction;
