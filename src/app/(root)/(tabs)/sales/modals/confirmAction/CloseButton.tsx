import { COLORS } from "@/utils/colors";
import { Scale } from "@/utils/scaling";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import styles from "../../styles/styles";

const CloseButton = ({
  title,
  onClose,
}: {
  title: string;
  onClose: () => void;
}) => {
  return (
    <TouchableOpacity
      style={{ paddingLeft: Scale.moderate(20) }}
      onPress={onClose}
    >
      <Text
        style={[styles.textMed, { color: COLORS.gray400 }]}
        className={`font-Jakarta`}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CloseButton;
