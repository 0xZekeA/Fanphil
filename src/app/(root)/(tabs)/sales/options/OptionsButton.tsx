import { COLORS } from "@/utils/colors";
import React from "react";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useMenuProvider } from "../hooks/MenuProvider";
import styles from "../styles/styles";

const OptionsButton = () => {
  const { onOpenMenuOptions } = useMenuProvider();
  return (
    <TouchableOpacity
      onPress={onOpenMenuOptions}
      className="items-center justify-center"
      style={styles.optionsBtn}
    >
      <Icon name="options-outline" size={20} color={COLORS.gray500} />
    </TouchableOpacity>
  );
};

export default OptionsButton;
