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
