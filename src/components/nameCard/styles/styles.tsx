import { COLORS } from "@/utils/colors";
import { Scale } from "@/utils/scaling";
import { Platform, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: COLORS.white,
    paddingHorizontal: Scale.moderate(16),
    paddingVertical: Scale.moderate(8),
    shadowColor: Platform.OS === "ios" ? COLORS.gray200 : COLORS.gray100,
    shadowOpacity: Platform.OS === "ios" ? 0.08 : 0.02,
    shadowRadius: Scale.moderate(25),
    shadowOffset: { width: 2, height: 2 },
    elevation: Scale.moderate(2),
    borderRadius: 24,
  },
  syncedIndicator: {
    width: Scale.moderate(16),
    height: Scale.moderate(16),
    borderRadius: 360,
  },
  img: {
    width: Scale.moderate(44),
    height: Scale.moderate(44),
    borderRadius: Scale.moderate(360),
  },
  textName: {
    color: COLORS.gray800,
    fontSize: Scale.font(13),
    lineHeight: Scale.lineHeight(13),
  },
  textDets: {
    color: COLORS.gray400,
    fontSize: Scale.font(12),
    lineHeight: Scale.lineHeight(12),
  },
});

export default styles;
