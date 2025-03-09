import { COLORS } from "@/src/utils/colors";
import { Scale } from "@/src/utils/scaling";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Scale.moderate(16),
    backgroundColor: COLORS.white,
  },
  text: {
    fontSize: Scale.font(14),
    lineHeight: Scale.lineHeight(14),
    color: COLORS.gray800,
  },
});

export default styles;
