import { COLORS } from "@/utils/colors";
import { smallScreen } from "@/utils/getScreenSize";
import { Scale } from "@/utils/scaling";
import { Dimensions, StyleSheet } from "react-native";

const { height } = Dimensions.get("screen");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Scale.moderate(16),
    backgroundColor: COLORS.white,
    rowGap: Scale.moderate(smallScreen ? 24 : 32),
  },
  backBtn: {
    position: undefined,
  },
  contentContainer: {
    paddingHorizontal: Scale.moderate(24),
    backgroundColor: COLORS.white,
    rowGap: Scale.moderate(smallScreen ? 24 : 32),
    height: height * 0.7,
    justifyContent: "space-around",
  },
  inputFieldContainer: {
    rowGap: Scale.moderate(smallScreen ? 24 : 32),
  },
  buttonContainer: {
    marginTop: Scale.moderate(24),
  },
  title: {
    fontSize: Scale.font(20),
    lineHeight: Scale.lineHeight(20),
    marginBottom: Scale.moderate(8),
  },
  subtitle: {
    fontSize: Scale.font(16),
    lineHeight: Scale.lineHeight(16),
    color: COLORS.gray400,
    marginBottom: Scale.moderate(16),
  },
});

export default styles;
