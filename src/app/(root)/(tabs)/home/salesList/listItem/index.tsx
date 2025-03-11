import HapticButton from "@/components/HapticsButton";
import React from "react";
import styles from "../../styles/styles";
import BottomSection from "./BottomSection";
import TopSection from "./TopSection";

const SalesItem = ({ sale }: { sale: Sale }) => {
  return (
    <HapticButton style={styles.salesListItem}>
      <TopSection sale={sale} />
      <BottomSection sale={sale} />
    </HapticButton>
  );
};

export default SalesItem;
