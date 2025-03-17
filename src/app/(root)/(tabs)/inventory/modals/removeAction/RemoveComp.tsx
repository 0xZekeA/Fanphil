import { Scale } from "@/utils/scaling";
import React from "react";
import { Text, View } from "react-native";
import { useRemoveItemsProvider } from "../../hooks/RemoveItemsProvider";
import styles from "../../styles/styles";
import CancelBtn from "./CancelBtn";
import ItemAddComp from "./ItemAddComp";

const RemoveComp = ({ item }: { item: Inventory }) => {
  const { getRemainingQuantity } = useRemoveItemsProvider();

  const qtyRemaining = getRemainingQuantity();

  return (
    <View
      style={{ rowGap: Scale.moderate(24), paddingBottom: Scale.moderate(24) }}
    >
      <View
        style={{ columnGap: Scale.moderate(64) }}
        className="flex-row items-center justify-center"
      >
        <Text style={styles.textBase} className="font-Jakarta">
          Remaining Qty:
        </Text>
        <Text style={styles.textBase} className="font-JakartaSemiBold">
          {qtyRemaining}
        </Text>
      </View>
      <View className="flex-row items-center justify-center">
        <View
          style={{ columnGap: Scale.moderate(40) }}
          className="flex-row items-center"
        >
          <ItemAddComp />
          <CancelBtn item={item} />
        </View>
      </View>
    </View>
  );
};

export default RemoveComp;
