import { icons } from "$root/constants/assets";
import BackButton from "@/components/BackButton";
import HapticButton from "@/components/HapticsButton";
import IconButton from "@/components/IconButton";
import { useUsersProvider } from "@/providers/users/UsersProvider";
import { COLORS } from "@/utils/colors";
import { Scale } from "@/utils/scaling";
import { router } from "expo-router";
import React from "react";
import { View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const TopSection = () => {
  const { sellers } = useUsersProvider();

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
          onPress={() => router.push("/(root)/transferHistory")}
        />

        {!sellers ||
          ((sellers || []).length === 0 && (
            <HapticButton onPress={() => router.push("/(root)/staff")}>
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
