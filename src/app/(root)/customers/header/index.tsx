import BackButton from "@/components/BackButton";
import { COLORS } from "@/utils/colors";
import { Scale } from "@/utils/scaling";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useCustomerForm } from "../hooks/CustomerFormProvider";
import styles from "../styles/styles";

const Header = () => {
  const { setIsFormDisplayed } = useCustomerForm();
  return (
    <View
      style={{ paddingRight: Scale.moderate(24) }}
      className="flex-row justify-between items-center"
    >
      <BackButton title="Customers" />
      <TouchableOpacity onPress={() => setIsFormDisplayed(true)}>
        <Text style={[styles.textMed, { color: COLORS.blue600 }]}>Add</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Header;
