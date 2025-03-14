import { Scale } from "@/utils/scaling";
import React from "react";
import { Text, View } from "react-native";
import styles from "../../styles/styles";

const FormHeader = () => {
  return (
    <View
      style={{ marginBottom: Scale.moderate(24), rowGap: Scale.moderate(16) }}
      className="items-center"
    >
      <Text style={styles.textLarge} className="font-JakartaSemiBold">
        Customer Details
      </Text>
    </View>
  );
};

export default FormHeader;
