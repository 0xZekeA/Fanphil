import { COLORS } from "@/utils/colors";
import { smallScreen } from "@/utils/getScreenSize";
import { Scale } from "@/utils/scaling";
import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("screen");

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
  },
  header: {
    fontSize: Scale.font(20),
    lineHeight: Scale.lineHeight(20),
    color: COLORS.gray700,
  },
  contentContainer: {
    paddingHorizontal: Scale.moderate(44),
    rowGap: Scale.moderate(32),
  },
  sheetContainer: {
    width: "100%",
    paddingHorizontal: Scale.moderate(32),
    paddingVertical: Scale.moderate(24),
  },
  bannerImg: {
    width: "100%",
    height: Scale.vertical(smallScreen ? 272 : 430),
    resizeMode: "cover",
    position: "absolute",
    bottom: 0,
  },
  modalContainer: {
    width: width * 0.8,
    maxWidth: 700,
    minHeight: Scale.moderate(300),
    backgroundColor: COLORS.white,
    borderRadius: Scale.moderate(24),
    paddingHorizontal: Scale.moderate(16),
    paddingVertical: Scale.moderate(20),
  },
  mailImg: {
    height: Scale.moderate(smallScreen ? 64 : 84),
    width: Scale.moderate(smallScreen ? 64 : 84),
    resizeMode: "contain",
  },
  resetContainer: { rowGap: Scale.moderate(16), width: "100%" },
  resetBtnsContainer: {
    paddingHorizontal: Scale.moderate(24),
    width: "100%",
  },
  resetForm: {
    rowGap: Scale.moderate(8),
    width: "100%",
    maxWidth: smallScreen ? "100%" : width * 0.4,
    paddingHorizontal: Scale.moderate(24),
  },
  inputContainer: {
    rowGap: Scale.moderate(16),
  },
  onboardingTextContainer: {
    paddingHorizontal: Scale.moderate(16),
    rowGap: Scale.moderate(10),
    width: "100%",
  },
  buttonContainer: {
    rowGap: Scale.moderate(16),
    paddingHorizontal: Scale.moderate(smallScreen ? 44 : 64),
  },
  divider: {
    columnGap: Scale.moderate(16),
  },

  // Buttons
  back: {
    backgroundColor: COLORS.white,
    borderRadius: 80,
    width: Scale.moderate(40),
    height: Scale.moderate(40),
    position: "absolute",
    left: Scale.moderate(24),
    top: Scale.moderate(48),
    zIndex: Scale.moderate(10),
    justifyContent: "center",
    alignItems: "center",
  },
  sendLinkBtn: {
    backgroundColor: COLORS.blue500,
    padding: Scale.moderate(12),
    borderRadius: 8,
    minWidth: Scale.moderate(120),
    alignItems: "center",
    flex: 3,
  },
  button: {
    paddingVertical: Scale.moderate(16),
    borderRadius: Scale.moderate(100),
  },
  bottonRegister: {
    backgroundColor: COLORS.sky800,
    borderRadius: Scale.moderate(100),
    shadowColor: COLORS.gray900,
    shadowOpacity: 0.25,
    elevation: 5,
    shadowRadius: Scale.moderate(24),
    shadowOffset: { width: 3, height: 5 },
  },
  bottonGoogle: {
    backgroundColor: COLORS.white,
    columnGap: Scale.moderate(10),
    borderRadius: Scale.moderate(100),
    shadowColor: COLORS.gray900,
    shadowOpacity: 0.05,
    elevation: 5,
    shadowRadius: Scale.moderate(24),
    shadowOffset: { width: 3, height: 5 },
    borderColor: COLORS.gray100,
    borderWidth: Scale.moderate(1),
  },
  line: {
    height: Scale.moderate(0.8),
    width: Scale.moderate(120),
    backgroundColor: COLORS.gray200,
  },

  // Texts
  textButton: {
    fontSize: Scale.font(17),
    lineHeight: Scale.lineHeight(17),
  },
  textDivider: {
    fontSize: Scale.font(15),
    lineHeight: Scale.lineHeight(15),
  },
  textRegister: {
    color: COLORS.white,
  },
  textGoogle: {
    color: COLORS.gray800,
    letterSpacing: 1,
  },
  textOnboardingHeader: {
    fontSize: Scale.font(28),
    lineHeight: Scale.lineHeight(28, 1.2),
    color: COLORS.gray900,
  },
  textCall: {
    fontSize: Scale.font(17),
    lineHeight: Scale.lineHeight(17, smallScreen ? 1.2 : 1.45),
    color: COLORS.gray500,
  },
  textTitle: {
    fontSize: Scale.font(24),
    lineHeight: Scale.lineHeight(24, 1.2),
    color: COLORS.gray800,
  },
  textBase: {
    fontSize: Scale.font(smallScreen ? 16 : 18),
    lineHeight: Scale.lineHeight(smallScreen ? 16 : 18),
    color: COLORS.gray800,
  },
  textSmLight: {
    fontSize: Scale.font(14),
    lineHeight: Scale.lineHeight(14),
    color: COLORS.gray500,
  },
  textSmWhite: {
    fontSize: Scale.font(14),
    lineHeight: Scale.lineHeight(14),
    color: COLORS.white,
  },
});

export default styles;
