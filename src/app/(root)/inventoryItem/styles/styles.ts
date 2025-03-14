import { COLORS } from "@/utils/colors";
import { Scale } from "@/utils/scaling";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Scale.moderate(16),
    backgroundColor: COLORS.white,
  },
  addInventoryItemsContentContainer: {
    paddingVertical: Scale.moderate(48),
    paddingHorizontal: Scale.moderate(24),
    backgroundColor: COLORS.white,
  },
  addInventoryItemsFields: {
    width: "100%",
    alignSelf: "stretch",
    rowGap: Scale.moderate(24),
    marginBottom: Scale.moderate(24),
  },
  textLarge: {
    fontSize: Scale.font(20),
    lineHeight: Scale.lineHeight(20),
    color: COLORS.gray800,
  },
  textBase: {
    fontSize: Scale.font(14),
    lineHeight: Scale.lineHeight(14),
    color: COLORS.gray800,
  },
  textMed: {
    fontSize: Scale.font(14),
    lineHeight: Scale.lineHeight(14),
    color: COLORS.gray800,
  },
});

export default styles;
