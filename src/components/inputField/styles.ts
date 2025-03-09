import { COLORS } from "@/src/utils/colors";
import { Scale } from "@/src/utils/scaling";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F6F8FA",
  },
  iconStyle: {
    width: Scale.moderate(20),
    height: Scale.moderate(20),
    resizeMode: "contain",
  },
  labelText: {
    fontSize: Scale.moderate(15),
    lineHeight: Scale.moderate(15),
    color: COLORS.gray800,
    marginBottom: Scale.moderate(4),
    marginLeft: Scale.moderate(4),
  },
  textField: {
    paddingVertical: Scale.moderate(12),
    paddingHorizontal: Scale.moderate(8),
    borderRadius: 360,
  },
  textXSmall: {
    fontSize: Scale.moderate(12),
    lineHeight: Scale.moderate(12),
    color: COLORS.blue700,
  },
  textSmall: {
    fontSize: Scale.moderate(14),
    lineHeight: Scale.moderate(14),
    color: COLORS.mint800,
  },
});
