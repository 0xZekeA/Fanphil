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
  icons: {
    width: Scale.moderate(24),
    height: Scale.moderate(24),
    tintColor: COLORS.gray800,
  },
  pageHeader: {
    marginVertical: Scale.moderate(12),
    paddingHorizontal: Scale.moderate(16),
  },
  printBtn: {
    width: "100%",
    paddingVertical: Scale.moderate(20),
    borderWidth: 0.5,
    backgroundColor: COLORS.white,
    borderColor: COLORS.sky800,
    borderRadius: 10,
  },
  optionsBtn: {
    width: Scale.moderate(32),
    height: Scale.moderate(32),
    borderRadius: 360,
    backgroundColor: COLORS.white,
  },
  salesListItem: {
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
  salesInfoContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    shadowColor: COLORS.sky900,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
    marginHorizontal: 16,
    marginVertical: 12,
    overflow: "hidden",
  },
  headerGradient: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  headerText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  flatListContent: {
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  cardContainer: {
    paddingHorizontal: 8,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.sky100,
    borderRadius: 10,
    padding: 14,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.sky700,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.sky300,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    color: COLORS.sky900,
    marginBottom: 4,
  },
  value: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.black,
  },
  profitValue: {
    color: COLORS.sky800,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
    opacity: 0.6,
  },
  dateContainer: {
    paddingBottom: Scale.moderate(8),
    paddingTop: Scale.moderate(12),
    paddingLeft: Scale.moderate(18),
  },
  modalActionBtn: {
    width: "100%",
    paddingHorizontal: Scale.moderate(24),
    paddingTop: Scale.moderate(16),
  },
  textXL: {
    color: COLORS.gray800,
    fontSize: Scale.font(24),
    lineHeight: Scale.lineHeight(24),
  },
  textLarge: {
    fontSize: Scale.font(20),
    lineHeight: Scale.lineHeight(20),
    color: COLORS.gray800,
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
    color: COLORS.gray800,
  },
  textXS: {
    fontSize: Scale.font(10),
    lineHeight: Scale.lineHeight(10),
    color: COLORS.gray800,
  },
});

export default styles;
