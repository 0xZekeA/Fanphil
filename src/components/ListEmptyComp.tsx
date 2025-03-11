import { images } from "$root/constants/assets";
import { COLORS } from "@/utils/colors";
import { Scale } from "@/utils/scaling";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const ListEmptyComp = ({ message }: { message?: string }) => {
  return (
    <View
      style={{ marginVertical: Scale.moderate(32) }}
      className="items-center"
    >
      <Image
        source={images.noResult}
        style={[
          styles.iconStyle,
          { height: Scale.moderate(192), width: Scale.moderate(192) },
        ]}
      />

      <Text style={styles.text} className="font-Jakarta">
        {message ?? "No data to show for now"}
      </Text>
    </View>
  );
};

export default ListEmptyComp;

const styles = StyleSheet.create({
  iconStyle: {
    width: Scale.moderate(24),
    height: Scale.moderate(24),
    resizeMode: "contain",
  },
  text: {
    color: COLORS.gray200,
    fontSize: Scale.font(12),
    lineHeight: Scale.lineHeight(12),
    marginTop: Scale.moderate(24),
  },
});
