import HapticButton from "@/components/HapticsButton";
import { COLORS } from "@/utils/colors";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { useInventorySearchProvider } from "../providers/InventorySearchProvider";

const CloseButton = () => {
  const { deactivateSearch } = useInventorySearchProvider();

  return (
    <HapticButton
      onPress={deactivateSearch}
      style={{ flexBasis: "10%", zIndex: 105 }}
      className="justify-center items-center"
    >
      <Icon name="close" size={20} color={COLORS.gray800} />
    </HapticButton>
  );
};

export default CloseButton;
