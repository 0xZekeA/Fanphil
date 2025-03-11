import { COLORS } from "@/utils/colors";
import { Scale } from "@/utils/scaling";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingCircle: {
    position: "absolute",
    borderWidth: 2,
    borderStyle: "dashed",
  },
  btnText: {
    fontSize: Scale.font(14),
    lineHeight: Scale.lineHeight(14),
    color: COLORS.white,
  },
});

export default styles;
