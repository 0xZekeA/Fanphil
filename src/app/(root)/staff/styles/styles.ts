import { COLORS } from "@/utils/colors";
import { Scale } from "@/utils/scaling";
import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("screen");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Scale.moderate(4),
    backgroundColor: COLORS.white,
  },
  confirmActionHeader: {
    paddingVertical: Scale.moderate(16),
    paddingHorizontal: Scale.moderate(20),
    marginBottom: Scale.moderate(12),
  },
  modalContainer: {
    width: width * 0.8,
    maxWidth: 700,
    backgroundColor: COLORS.white,
    borderRadius: Scale.moderate(24),
    paddingHorizontal: Scale.moderate(16),
    paddingVertical: Scale.moderate(20),
  },
  flatlistContentContainerStyle: {
    flexGrow: 1,
    rowGap: Scale.moderate(8),
  },
  staffFormContentContainer: {
    height: height * 0.7,
    borderRadius: 16,
    alignSelf: "stretch",
    paddingVertical: Scale.moderate(32),
    paddingHorizontal: Scale.moderate(16),
    backgroundColor: COLORS.white,
    zIndex: 800,
  },
  staffFormFields: {
    width: "100%",
    alignSelf: "stretch",
    rowGap: Scale.moderate(24),
    marginBottom: Scale.moderate(24),
  },
  icons: {
    width: Scale.moderate(20),
    height: Scale.moderate(20),
    tintColor: COLORS.gray800,
  },
  addImg: {
    width: Scale.moderate(92),
    height: Scale.moderate(92),
    borderRadius: Scale.moderate(360),
    resizeMode: "cover",
  },
  textLarge: {
    fontSize: Scale.font(20),
    lineHeight: Scale.lineHeight(20),
    color: COLORS.gray800,
  },
  textBase: {
    fontSize: Scale.font(16),
    lineHeight: Scale.lineHeight(16),
    color: COLORS.gray800,
  },
  textMed: {
    fontSize: Scale.font(14),
    lineHeight: Scale.lineHeight(14),
    color: COLORS.gray700,
  },
});

export default styles;
