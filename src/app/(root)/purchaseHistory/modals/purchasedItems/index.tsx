import CustomButton from "@/components/customButton";
import { Scale } from "@/utils/scaling";
import { Text, View } from "react-native";
import { useHistoryListProvider } from "../../providers/HistoryListProvider";
import styles from "../../styles/styles";
import PurchasedListItem from "./PurchasedListItem";

const PurchasedItems = ({ onClose }: { onClose: () => void }) => {
  const { selectedItem, items } = useHistoryListProvider();

  if (!selectedItem || !items) return null;

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
          Items Purchased
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
          items.map((item, index) => (
            <PurchasedListItem key={index} item={item} />
          ))
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

export default PurchasedItems;
