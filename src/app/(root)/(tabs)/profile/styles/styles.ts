import { COLORS } from "@/utils/colors";
import { Scale } from "@/utils/scaling";
import { Platform, StatusBar, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginTop: StatusBar.currentHeight,
  },
  detailsContainer: {
    paddingHorizontal: Scale.moderate(32),
    marginBottom: Scale.moderate(40),
  },
  settingsContainer: {
    padding: Scale.moderate(20),
    paddingLeft: Scale.moderate(24),
    borderRadius: Scale.moderate(24),
    backgroundColor: COLORS.sky100,
    rowGap: Scale.moderate(12),
    width: "100%",
    shadowColor: Platform.OS === "ios" ? COLORS.gray400 : COLORS.gray100,
    shadowOpacity: Platform.OS === "ios" ? 0.08 : 0.02,
    shadowRadius: Scale.moderate(25),
    shadowOffset: { width: 2, height: 2 },
    elevation: Scale.moderate(2),
  },
  settingsItem: {
    marginBottom: Scale.moderate(40),
    rowGap: Scale.moderate(12),
    paddingHorizontal: Scale.moderate(8),
  },
  pfpContainer: {
    borderRadius: 360,
    overflow: "hidden",
    height: Scale.moderate(120),
    width: Scale.moderate(120),
  },
  ratings: {
    rowGap: Scale.moderate(4),
    backgroundColor: COLORS.gray50,
    paddingHorizontal: Scale.moderate(12),
    paddingVertical: Scale.moderate(4),
    borderRadius: 8,
    marginBottom: Scale.moderate(12),
  },
  pfp: {
    height: Scale.moderate(120),
    width: Scale.moderate(120),
    resizeMode: "contain",
  },
  imgViewerBtn: {
    position: "absolute",
    top: 50,
    zIndex: 200,
    padding: 20,
  },
  imgActivityIndicator: {
    position: "absolute",
    top: "50%",
    left: "48%",
  },
  imgViewerText: {
    fontSize: Scale.font(18),
    lineHeight: Scale.lineHeight(18),
    color: COLORS.white,
  },
  iconStyle: {
    height: Scale.moderate(20),
    width: Scale.moderate(20),
    tintColor: COLORS.gray800,
  },
  textCategoryHeader: {
    fontSize: Scale.font(16),
    lineHeight: Scale.lineHeight(16),
    color: COLORS.gray700,
    paddingLeft: Scale.moderate(24),
  },
  textName: {
    fontSize: Scale.font(18),
    lineHeight: Scale.lineHeight(18),
    color: COLORS.gray800,
  },
  textBase: {
    fontSize: Scale.font(16),
    lineHeight: Scale.lineHeight(16),
    color: COLORS.gray500,
  },
  textSmall: {
    fontSize: Scale.font(14),
    lineHeight: Scale.lineHeight(14),
    color: COLORS.gray700,
  },
  textXSmall: {
    fontSize: Scale.font(12),
    lineHeight: Scale.lineHeight(12),
    color: COLORS.gray700,
  },
});

export default styles;
