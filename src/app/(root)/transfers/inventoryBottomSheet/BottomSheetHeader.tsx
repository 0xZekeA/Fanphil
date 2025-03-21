import { Scale } from "@/utils/scaling";
import React from "react";
import { Text, View } from "react-native";
import { useTransferFormProvider } from "../providers/TransferFormProvider";
import styles from "../styles/styles";

const BottomSheetHeader = () => {
  const { error } = useTransferFormProvider();

  return (
    <View
      className="items-center justify-center"
      style={{
        width: "100%",
        rowGap: Scale.moderate(16),
        marginBottom: Scale.moderate(8),
      }}
    >
      <Text style={styles.textLarge} className="font-Jakarta">
        Pick an item
      </Text>
      {error && (
        <Text style={styles.textMed} className="font-JakartaLight">
          {error}
        </Text>
      )}
    </View>
  );
};

export default BottomSheetHeader;
