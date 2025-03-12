import { icons } from "$root/constants/assets";
import BackButton from "@/components/BackButton";
import HapticButton from "@/components/HapticsButton";
import IconButton from "@/components/IconButton";
import { useSellerDetsProvider } from "@/providers/seller/SellerDetsProvider";
import { COLORS } from "@/utils/colors";
import { Scale } from "@/utils/scaling";
import React from "react";
import { View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const TopSection = () => {
  const { sellers } = useSellerDetsProvider();

  return (
    <View
      style={{ paddingBottom: Scale.moderate(16) }}
      className="justify-between items-center flex-row"
    >
      <BackButton title="Transfers" />
      <View
        style={{
          columnGap: Scale.moderate(12),
          paddingRight: Scale.moderate(16),
        }}
        className="flex-row items-center"
      >
        <IconButton
          color={COLORS.gray600}
          icon={icons.list}
          onPress={() => {}}
        />

        {!sellers ||
          ((sellers || []).length === 0 && (
            <HapticButton onPress={() => {}}>
              <Icon
                name="person-add-outline"
                size={20}
                color={COLORS.gray800}
              />
            </HapticButton>
          ))}
      </View>
    </View>
  );
};

export default TopSection;
