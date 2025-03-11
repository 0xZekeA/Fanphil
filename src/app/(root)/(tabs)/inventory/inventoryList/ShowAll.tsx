import { COLORS } from "@/utils/colors";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { useInventoryListProvider } from "../hooks/InventoryListProvider";
import styles from "../styles/styles";

const ShowAll = () => {
  const { setIsEightShown, isEightShown, isLongerThanEight } =
    useInventoryListProvider();

  return (
    isLongerThanEight && (
      <TouchableOpacity
        className="items-end"
        onPress={() => setIsEightShown(!isEightShown)}
      >
        <Text
          style={[styles.textSmall, { color: COLORS.indigo900 }]}
          className="font-JakartaLight"
        >
          {isEightShown ? "Show All" : "Show Less"}
        </Text>
      </TouchableOpacity>
    )
  );
};

export default ShowAll;
