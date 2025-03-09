import { COLORS } from "@/utils/colors";
import { Scale } from "@/utils/scaling";
import { StyleSheet } from "react-native";

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
  text: {
    fontSize: Scale.font(14),
    lineHeight: Scale.lineHeight(14),
    color: COLORS.gray800,
  },
});

export default styles;
