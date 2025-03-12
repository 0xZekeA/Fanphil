import { COLORS } from "@/utils/colors";
import { Scale } from "@/utils/scaling";
import { StyleSheet } from "react-native";

// Change in hooks too
const MENU_PADDING = Scale.moderate(8);
const MENU_WIDTH = Scale.moderate(200);
const CONTAINER_HEIGHT = Scale.moderate(40);

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: MENU_WIDTH,
    height: CONTAINER_HEIGHT,
    backgroundColor: "white",
    borderRadius: 16,
    padding: MENU_PADDING,
    elevation: 5,
    shadowColor: COLORS.gray100,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.65,
    shadowRadius: 4,
    zIndex: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  textCall: {
    fontSize: Scale.font(14),
    color: COLORS.gray800,
    lineHeight: Scale.lineHeight(14),
    textAlign: "center",
  },
});

export default styles;
