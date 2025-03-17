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
  pageHeader: {
    marginVertical: Scale.moderate(12),
    paddingHorizontal: Scale.moderate(16),
  },
  searchListItem: {
    width: "100%",
    paddingHorizontal: Scale.moderate(24),
    paddingVertical: Scale.moderate(20),
    borderBottomWidth: 0.2,
    borderBottomColor: COLORS.gray100,
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
  searchBar: { flexBasis: "85%", flexGrow: 1, marginTop: Scale.moderate(4) },
  iconStyle: {
    width: Scale.moderate(24),
    height: Scale.moderate(24),
    resizeMode: "contain",
  },
  confirmActionHeader: {
    paddingVertical: Scale.moderate(16),
    paddingHorizontal: Scale.moderate(20),
    marginBottom: Scale.moderate(12),
  },
  icons: {
    width: Scale.moderate(24),
    height: Scale.moderate(24),
    tintColor: COLORS.gray800,
  },
  optionsBtn: {
    width: Scale.moderate(32),
    height: Scale.moderate(32),
    borderRadius: 360,
    backgroundColor: COLORS.white,
  },
  syncedIndicator: {
    width: Scale.moderate(16),
    height: Scale.moderate(16),
    borderRadius: 360,
  },
  textXL: {
    color: COLORS.gray800,
    fontSize: Scale.font(24),
    lineHeight: Scale.lineHeight(24),
  },
  textLarge: {
    color: COLORS.gray800,
    fontSize: Scale.font(20),
    lineHeight: Scale.lineHeight(20),
  },
  textBase: {
    color: COLORS.gray800,
    fontSize: Scale.font(16),
    lineHeight: Scale.lineHeight(16),
  },
  textMed: {
    fontSize: Scale.font(14),
    lineHeight: Scale.lineHeight(14),
    color: COLORS.gray700,
  },
  textSmall: {
    color: COLORS.gray800,
    fontSize: Scale.font(14),
    lineHeight: Scale.lineHeight(14),
  },
});

export default styles;
