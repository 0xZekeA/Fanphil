import { COLORS } from "@/utils/colors";
import { Scale } from "@/utils/scaling";
import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("screen");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Scale.moderate(16),
    backgroundColor: COLORS.white,
  },
  optionsBtn: {
    width: Scale.moderate(32),
    height: Scale.moderate(32),
    borderRadius: 360,
    backgroundColor: COLORS.white,
  },
  listItem: {
    rowGap: Scale.moderate(8),
    paddingHorizontal: Scale.moderate(24),
    paddingVertical: Scale.moderate(12),
    borderRadius: Scale.moderate(20),
    backgroundColor: COLORS.white,
    marginBottom: Scale.moderate(12),
    position: "relative",
    overflow: "hidden",
  },
  indicator: {
    width: Scale.moderate(4),
    height: 60,
    position: "absolute",
    left: 0,
    top: Scale.moderate(10),
  },
  modalContainer: {
    width: width * 0.8,
    maxWidth: 700,
    backgroundColor: COLORS.white,
    borderRadius: Scale.moderate(24),
    paddingHorizontal: Scale.moderate(16),
    paddingVertical: Scale.moderate(20),
  },
  confirmActionHeader: {
    paddingVertical: Scale.moderate(16),
    paddingHorizontal: Scale.moderate(20),
    marginBottom: Scale.moderate(12),
  },
  textBase: {
    fontSize: Scale.font(16),
    lineHeight: Scale.lineHeight(16),
    color: COLORS.gray800,
  },
  textMed: {
    fontSize: Scale.font(14),
    lineHeight: Scale.lineHeight(14),
    color: COLORS.gray800,
  },
  textSmall: {
    fontSize: Scale.font(12),
    lineHeight: Scale.lineHeight(12),
    color: COLORS.gray700,
  },
});

export default styles;
