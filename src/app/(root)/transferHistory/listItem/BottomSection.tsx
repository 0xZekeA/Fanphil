import { COLORS } from "@/utils/colors";
import React from "react";
import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import useItemDetsHooks from "../hooks/itemDets.hooks";
import styles from "../styles/styles";

const TopSection = ({ item }: { item: InventoryTransfer | Return }) => {
  const { getCreator, getCreatee, isReturn } = useItemDetsHooks();

  const creator = getCreator(item);
  const createe = getCreatee(item);

  return (
    <View className="justify-between items-center flex-row">
      <Text style={styles.textMed} className="font-JakartaExtraLight">
        {creator}
      </Text>
      {isReturn(item) ? (
        <Icon name="arrow-back-outline" size={12} color={COLORS.gray300} />
      ) : (
        <Icon name="arrow-forward-outline" size={12} color={COLORS.gray300} />
      )}
      <Text style={styles.textMed} className="font-JakartaExtraLight">
        {createe}
      </Text>
    </View>
  );
};

export default TopSection;
