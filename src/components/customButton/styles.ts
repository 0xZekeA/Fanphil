import { COLORS } from "@/utils/colors";
import { Scale } from "@/utils/scaling";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  btn: {
    backgroundColor: COLORS.sky800,
    borderRadius: 360,
    paddingHorizontal: Scale.moderate(32),
    paddingVertical: Scale.moderate(12),
    shadowColor: COLORS.gray500,
    shadowOpacity: 0.15,
    elevation: 5,
    shadowRadius: Scale.moderate(10),
    shadowOffset: { width: 3, height: 5 },
  },
  text: {
    fontSize: Scale.font(16),
    lineHeight: Scale.lineHeight(16),
    color: COLORS.white,
  },
});

export default styles;
