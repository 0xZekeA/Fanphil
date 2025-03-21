import HapticButton from "@/components/HapticsButton";
import { COLORS } from "@/utils/colors";
import React from "react";
import { Text } from "react-native";
import { useSellItemFormProvider } from "../hooks/SellItemFormProvider";
import styles from "../styles/styles";

const PrintBtn = () => {
  const { setIsReceiptShown } = useSellItemFormProvider();
  return (
    <HapticButton
      style={styles.printBtn}
      onPress={() => setIsReceiptShown(true)}
      className="justify-center items-center"
    >
      <Text
        style={[styles.textBase, { color: COLORS.sky800 }]}
        className="font-JakartaMedium"
      >
        Save receipt
      </Text>
    </HapticButton>
  );
};

export default PrintBtn;
