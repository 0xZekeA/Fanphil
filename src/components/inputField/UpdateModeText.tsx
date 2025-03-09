import { Scale } from "@/utils/scaling";
import React from "react";
import { Text } from "react-native";
import { styles } from "./styles";

const UpdateModeText = ({ value }: { value: string }) => {
  return (
    <Text
      className="font-JakartaMedium"
      style={[
        styles.textField,
        {
          fontSize: Scale.font(14),
          lineHeight: Scale.lineHeight(14),
          paddingVertical: Scale.moderate(4),
        },
      ]}
    >
      {value}
    </Text>
  );
};

export default UpdateModeText;
