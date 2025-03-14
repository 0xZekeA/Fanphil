import { COLORS } from "@/utils/colors";
import { Scale } from "@/utils/scaling";
import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("screen");

const styles = StyleSheet.create({
  listItemContainer: {
    paddingHorizontal: Scale.moderate(48),
    width: "100%",
    marginBottom: Scale.moderate(24),
  },
  expenseCardContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    paddingHorizontal: Scale.moderate(16),
    paddingVertical: Scale.moderate(20),
    rowGap: Scale.moderate(24),
    width: width * 0.8,
  },
  textXl: {
    lineHeight: Scale.lineHeight(28),
    fontSize: Scale.font(28),
    color: COLORS.gray800,
  },
  textBase: {
    lineHeight: Scale.lineHeight(15),
    fontSize: Scale.font(15),
    color: COLORS.gray800,
  },
  textSmallBit: {
    lineHeight: Scale.lineHeight(13),
    fontSize: Scale.font(13),
    color: COLORS.gray800,
  },
  textXs: {
    color: COLORS.gray800,
    fontSize: Scale.font(12),
    lineHeight: Scale.lineHeight(12),
  },
});

export default styles;
