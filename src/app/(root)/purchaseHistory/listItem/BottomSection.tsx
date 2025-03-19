import { icons } from "$root/constants/assets";
import React, { useCallback, useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import { useHistoryListProvider } from "../hooks/HistoryListProvider";
import styles from "../styles/styles";

const TopSection = ({ item }: { item: Purchase }) => {
  const { getPurchaseItemsLength } = useHistoryListProvider();
  const [amount, setAmount] = useState(0);

  const getAmount = useCallback(async () => {
    const qty = await getPurchaseItemsLength(item);
    setAmount(qty);
  }, [item, getPurchaseItemsLength]);

  useEffect(() => {
    if (!item?.id) return;
    getAmount();
  }, [getAmount, item]);

  return (
    <View className="justify-between items-center flex-row">
      <Text style={styles.textMed} className="font-JakartaExtraLight">
        Inventory items - {amount}
      </Text>
      <Image source={icons.smallChevron} style={styles.icons} />
    </View>
  );
};

export default TopSection;
