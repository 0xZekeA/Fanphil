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
  salesInfoBtn: {
    padding: Scale.moderate(8),
    tintColor: COLORS.gray800,
    borderRadius: 40,
    backgroundColor: COLORS.mint100,
    columnGap: Scale.moderate(8),
  },
  text: {
    fontSize: Scale.font(14),
    lineHeight: Scale.lineHeight(14),
    color: COLORS.gray800,
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
});

export default styles;
