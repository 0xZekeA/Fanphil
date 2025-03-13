import { useCopyAnimation } from "@/providers/copy/CopyProvider";
import * as Clipboard from "expo-clipboard";
import React from "react";
import { Pressable, Text } from "react-native";
import HapticButton from "../../HapticsButton";
import styles from "../styles";

export const RowComponent = ({
  initial,
  later,
}: {
  initial: string;
  later: string | undefined;
}) => {
  const { callCopyAnimation } = useCopyAnimation();

  if (!later || !initial) return;

  return (
    <Pressable
      style={styles.listItemContainer}
      className="flex-row justify-between"
    >
      <Text style={styles.initialText} className="font-JakartaSemiBold">
        {initial}
      </Text>
      <HapticButton
        onPress={async () => {
          await Clipboard.setStringAsync(later);
          callCopyAnimation();
        }}
      >
        <Text style={styles.xSText} className={`font-JakartaMedium`}>
          {later.slice(0, 12)}
          {later.length > 12 && "..."}
        </Text>
      </HapticButton>
    </Pressable>
  );
};

export default RowComponent;
