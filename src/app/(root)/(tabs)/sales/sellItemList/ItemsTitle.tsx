import { COLORS } from "@/utils/colors";
import { Scale } from "@/utils/scaling";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useSellItemFormProvider } from "../providers/sellForm/SellItemFormProvider";
import styles from "../styles/styles";

const ItemsTitle = () => {
  const { openSheet, isSheetOpen } = useSellItemFormProvider();

  return (
    <View
      style={{ marginBottom: Scale.moderate(20) }}
      className="justify-between items-center flex-row"
    >
      <Text style={styles.textBase} className="font-JakartaSemiBold">
        Items to be sold
      </Text>
      <TouchableOpacity onPress={openSheet}>
        <Icon
          name={!isSheetOpen ? "chevron-down-outline" : "chevron-up-outline"}
          size={24}
          color={COLORS.gray700}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ItemsTitle;
