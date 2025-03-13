import { Scale } from "@/utils/scaling";
import React from "react";
import { Text, View } from "react-native";
import styles from "../../styles/styles";
import FormImage from "./FormImage";

const FormHeader = () => {
  return (
    <View
      style={{ marginBottom: Scale.moderate(24), rowGap: Scale.moderate(16) }}
      className="items-center"
    >
      <Text style={styles.textLarge} className="font-JakartaSemiBold">
        Staff Details
      </Text>
      <View style={{ columnGap: Scale.moderate(8) }} className="items-center">
        <FormImage />
      </View>
    </View>
  );
};

export default FormHeader;
