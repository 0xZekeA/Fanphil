import { COLORS } from "@/utils/colors";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { useSellersInventoryListProvider } from "../hooks/SellersInventoryListProvider";
import styles from "../styles/styles";

const ShowAll = () => {
  const { setIsEightShown, isEightShown, isLongerThanEight } =
    useSellersInventoryListProvider();

  return (
    isLongerThanEight && (
      <TouchableOpacity
        className="items-end"
        onPress={() => setIsEightShown(!isEightShown)}
      >
        <Text
          style={[styles.textMed, { color: COLORS.indigo900 }]}
          className="font-JakartaLight"
        >
          {isEightShown ? "Show All" : "Show Less"}
        </Text>
      </TouchableOpacity>
    )
  );
};

export default ShowAll;
