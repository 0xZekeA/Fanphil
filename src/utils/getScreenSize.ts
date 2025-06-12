import { Dimensions } from "react-native";

const { width } = Dimensions.get("screen");

export const smallScreen = width < 600;
