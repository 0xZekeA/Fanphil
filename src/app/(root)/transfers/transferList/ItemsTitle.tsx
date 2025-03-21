import { COLORS } from "@/utils/colors";
import { Scale } from "@/utils/scaling";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useTransferFormProvider } from "../hooks/TransferFormProvider";
import styles from "../styles/styles";

const ItemsTitle = () => {
  const { openSheet, isSheetOpen } = useTransferFormProvider();

  return (
    <View
      style={{ marginBottom: Scale.moderate(20) }}
      className="justify-between items-center flex-row"
    >
      <Text style={styles.textBase} className="font-JakartaSemiBold">
        Items
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
