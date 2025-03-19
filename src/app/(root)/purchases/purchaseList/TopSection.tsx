import { icons } from "$root/constants/assets";
import BackButton from "@/components/BackButton";
import IconButton from "@/components/IconButton";
import { COLORS } from "@/utils/colors";
import { Scale } from "@/utils/scaling";
import { router } from "expo-router";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const TopSection = () => {
  return (
    <View
      style={{ paddingBottom: Scale.moderate(16) }}
      className="justify-between items-center flex-row"
    >
      <BackButton title="Purchases" />
      <View
        style={{
          columnGap: Scale.moderate(16),
          paddingRight: Scale.moderate(12),
        }}
        className="flex-row items-center justify-between"
      >
        <TouchableOpacity
          style={{ paddingHorizontal: Scale.moderate(4) }}
          onPress={() => router.push("/(root)/addItems")}
        >
          <Icon name="add-circle-outline" size={20} color={COLORS.gray500} />
        </TouchableOpacity>
        <IconButton
          color={COLORS.gray600}
          icon={icons.list}
          onPress={() => router.push("/(root)/transferHistory")}
        />
      </View>
    </View>
  );
};

export default TopSection;
