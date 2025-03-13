import { COLORS } from "@/utils/colors";
import { Scale } from "@/utils/scaling";
import { Dimensions, StyleSheet } from "react-native";

const { height } = Dimensions.get("screen");

const styles = StyleSheet.create({
  container: {
    height: height * 0.75,
    maxHeight: 800,
    backgroundColor: COLORS.white,
    borderRadius: 24,
    zIndex: 40,
    paddingHorizontal: Scale.moderate(16),
    paddingVertical: Scale.moderate(20),
  },
  header: {
    paddingVertical: Scale.moderate(16),
    rowGap: Scale.moderate(16),
    marginBottom: Scale.moderate(32),
  },
  listItemContainer: { width: "100%", marginBottom: Scale.moderate(24) },
  pfpContainer: {
    width: Scale.moderate(80),
    height: Scale.moderate(80),
    borderRadius: 360,
  },
  pfp: {
    width: "100%",
    height: "100%",
    borderRadius: 360,
  },
  headerText: {
    fontSize: Scale.font(14),
    lineHeight: Scale.lineHeight(14),
    color: COLORS.gray700,
  },
  initialText: {
    fontSize: Scale.font(12),
    lineHeight: Scale.lineHeight(12),
    color: COLORS.gray700,
  },
  xSText: {
    fontSize: Scale.font(12),
    lineHeight: Scale.lineHeight(12),
    color: COLORS.gray400,
  },
});

export default styles;
