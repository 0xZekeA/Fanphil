import HapticButton from "@/components/HapticsButton";
import { COLORS } from "@/utils/colors";
import { Scale } from "@/utils/scaling";
import React from "react";
import { Text, View } from "react-native";
import useFinanceHooks from "../hooks/finance.hooks";
import styles from "../styles/styles";

const ExpandList = ({
  setIsExpanded,
  isExpanded,
}: {
  setIsExpanded: (set: boolean) => void;
  isExpanded: boolean;
}) => {
  const { breakDown } = useFinanceHooks();

  return (
    breakDown &&
    breakDown.length > 6 && (
      <View style={{ marginRight: Scale.moderate(48) }} className="items-end">
        <HapticButton onPress={() => setIsExpanded(!isExpanded)}>
          <Text
            style={(styles.textXs, { color: COLORS.indigo900 })}
            className="font-JakartaMedium"
          >
            {isExpanded ? "Show less" : "Show all"}
          </Text>
        </HapticButton>
      </View>
    )
  );
};

export default ExpandList;
