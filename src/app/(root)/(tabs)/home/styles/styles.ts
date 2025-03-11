import { COLORS } from "@/utils/colors";
import { Scale } from "@/utils/scaling";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Scale.moderate(8),
    backgroundColor: COLORS.white,
  },

  greetingsContainer: {
    paddingHorizontal: Scale.moderate(16),
    rowGap: Scale.moderate(8),
  },
  icons: {
    width: Scale.moderate(24),
    height: Scale.moderate(24),
    tintColor: COLORS.gray800,
  },
  updateBtn: {
    borderRadius: Scale.moderate(32),
    backgroundColor: COLORS.sky100,
    paddingHorizontal: Scale.moderate(24),
    paddingLeft: Scale.moderate(40),
    paddingVertical: Scale.moderate(28),
    columnGap: Scale.moderate(8),
  },
  ProgressBar: {
    backgroundColor: "#B5F99F",
    height: "100%",
    borderRadius: 4,
  },
  progressContainer: {
    width: "100%",
    borderRadius: 4,
    height: Scale.moderate(4),
    backgroundColor: COLORS.white,
  },
  actionBtn: {
    paddingHorizontal: Scale.moderate(24),
    paddingVertical: Scale.moderate(32),
    borderRadius: Scale.moderate(24),
  },
  salesInfoBtn: {
    padding: Scale.moderate(8),
    tintColor: COLORS.gray800,
    borderRadius: 40,
    backgroundColor: COLORS.mint100,
    columnGap: Scale.moderate(8),
  },
  salesListItem: {
    rowGap: Scale.moderate(8),
    paddingHorizontal: Scale.moderate(24),
    paddingVertical: Scale.moderate(20),
    borderRadius: Scale.moderate(24),
    backgroundColor: COLORS.sky100,
  },
  syncedIndicator: {
    width: Scale.moderate(16),
    height: Scale.moderate(16),
    borderRadius: 360,
  },
  textBase: {
    fontSize: Scale.font(16),
    lineHeight: Scale.lineHeight(16),
    color: COLORS.gray800,
  },
  textMed: {
    fontSize: Scale.font(14),
    lineHeight: Scale.lineHeight(14),
    color: COLORS.gray700,
  },
  textXLarge: {
    fontSize: Scale.font(20),
    lineHeight: Scale.lineHeight(20, 1.2),
    color: COLORS.gray700,
  },
  textSmall: {
    fontSize: Scale.font(12),
    lineHeight: Scale.lineHeight(12),
    color: COLORS.gray600,
  },
  textXSmall: {
    fontSize: Scale.font(10),
    lineHeight: Scale.lineHeight(10),
    color: COLORS.gray600,
  },
});

export default styles;
