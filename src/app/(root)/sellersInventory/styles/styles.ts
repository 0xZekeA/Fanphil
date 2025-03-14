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
  inventoryListItem: {
    rowGap: Scale.moderate(8),
    paddingHorizontal: Scale.moderate(16),
    paddingVertical: Scale.moderate(12),
    borderRadius: Scale.moderate(20),
    backgroundColor: COLORS.white,
    marginBottom: Scale.moderate(12),
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
  syncedIndicator: {
    width: Scale.moderate(16),
    height: Scale.moderate(16),
    borderRadius: 360,
  },
  icons: {
    width: Scale.moderate(24),
    height: Scale.moderate(24),
    tintColor: COLORS.gray800,
  },
  textLarge: {
    fontSize: Scale.font(18),
    lineHeight: Scale.lineHeight(18),
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
    color: COLORS.gray800,
  },
});

export default styles;
