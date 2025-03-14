import { COLORS } from "@/utils/colors";
import { Scale } from "@/utils/scaling";
import { Dimensions, StyleSheet } from "react-native";

const { height, width } = Dimensions.get("screen");

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
  modalContainer: {
    width: width * 0.8,
    maxWidth: 700,
    backgroundColor: COLORS.white,
    borderRadius: Scale.moderate(24),
    paddingHorizontal: Scale.moderate(16),
    paddingVertical: Scale.moderate(20),
  },
  customerFormContentContainer: {
    height: height * 0.7,
    borderRadius: 16,
    alignSelf: "stretch",
    paddingVertical: Scale.moderate(32),
    paddingHorizontal: Scale.moderate(16),
    backgroundColor: COLORS.white,
    zIndex: 800,
  },
  customerFormFields: {
    width: "100%",
    alignSelf: "stretch",
    rowGap: Scale.moderate(24),
    marginBottom: Scale.moderate(24),
  },
  syncedIndicator: {
    width: Scale.moderate(16),
    height: Scale.moderate(16),
    borderRadius: 360,
  },
  textLarge: {
    fontSize: Scale.font(20),
    lineHeight: Scale.lineHeight(20),
    color: COLORS.gray800,
  },
  textMed: {
    fontSize: Scale.font(14),
    lineHeight: Scale.lineHeight(14),
    color: COLORS.gray800,
  },
});

export default styles;
