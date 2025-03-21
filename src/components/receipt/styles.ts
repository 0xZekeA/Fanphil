import { COLORS } from "@/utils/colors";
import { Scale } from "@/utils/scaling";
import { Dimensions, StyleSheet } from "react-native";

const { height } = Dimensions.get("screen");

const styles = StyleSheet.create({
  container: {
    height: height * 0.7,
    width: "100%",
    paddingTop: Scale.moderate(24),
  },
  receiptCard: {
    backgroundColor: "white",
    borderRadius: Scale.moderate(8),
    paddingHorizontal: Scale.moderate(16),
    paddingVertical: Scale.moderate(32),
    rowGap: Scale.moderate(8),
    marginVertical: Scale.moderate(36),
    marginHorizontal: Scale.moderate(2),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    alignItems: "center",
    marginBottom: Scale.moderate(16),
  },
  businessName: {
    fontSize: Scale.font(18),
    fontWeight: "bold",
    textDecorationLine: "underline",
    marginBottom: 4,
  },
  businessInfo: {
    fontSize: Scale.font(12),
    color: "#555",
  },
  infoSection: {
    marginBottom: Scale.moderate(12),
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  infoLabel: {
    fontSize: Scale.font(12),
    color: "#555",
  },
  infoValue: {
    fontSize: Scale.font(12),
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginVertical: Scale.moderate(8),
  },
  itemsHeader: {
    flexDirection: "row",
    paddingBottom: Scale.moderate(4),
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  columnHeader: {
    fontSize: Scale.font(12),
    fontWeight: "bold",
    color: "#555",
  },
  itemRow: {
    flexDirection: "row",
    paddingVertical: Scale.moderate(6),
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  itemName: {
    fontSize: Scale.font(14),
    fontWeight: "500",
  },
  itemDetail: {
    fontSize: Scale.font(10),
    color: "#777",
    marginTop: Scale.moderate(2),
  },
  summary: {
    marginTop: Scale.moderate(8),
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: Scale.moderate(4),
  },
  summaryLabel: {
    fontWeight: "500",
  },
  summaryValue: {
    textAlign: "right",
  },
  totalLabel: {
    fontWeight: "bold",
    fontSize: Scale.font(14),
  },
  totalValue: {
    fontWeight: "bold",
    fontSize: Scale.font(14),
  },
  footer: {
    marginTop: Scale.moderate(16),
    alignItems: "center",
  },
  footerText: {
    fontSize: Scale.font(10),
    color: "#555",
    marginBottom: Scale.moderate(2),
  },
});

export default styles;

export const selectorStyles = StyleSheet.create({
  dropdownButtonStyle: {
    flexBasis: "65%",
    flexGrow: 1,
    height: Scale.moderate(50),
    backgroundColor: COLORS.gray50,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Scale.moderate(12),
    marginRight: Scale.moderate(16),
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: Scale.font(16),
    fontWeight: "500",
    color: "#151E26",
  },
  icon: {
    fontSize: Scale.font(20),
    color: COLORS.sky700,
  },
  dropdownButtonArrowStyle: {
    fontSize: Scale.font(20),
  },
  dropdownMenuStyle: {
    backgroundColor: "#E9ECEF",
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: Scale.moderate(12),
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: Scale.moderate(8),
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: Scale.font(14),
    fontWeight: "500",
    color: "#151E26",
  },
  dropdownItemIconStyle: {
    fontSize: Scale.font(18),
    marginRight: Scale.moderate(8),
  },
});
