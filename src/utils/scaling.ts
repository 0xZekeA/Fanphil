import { Dimensions, PixelRatio } from "react-native";

let { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const isTablet: boolean = SCREEN_WIDTH >= 768;
const BASE_WIDTH: number = isTablet ? 768 : 375;
const BASE_HEIGHT: number = isTablet ? 1024 : 812;

export const Scale = {
  size: (size: number): number => {
    const scale: number = SCREEN_WIDTH / BASE_WIDTH;
    return Math.round(size * scale);
  },

  vertical: (size: number): number => {
    const scale: number = SCREEN_HEIGHT / BASE_HEIGHT;
    const scaledSize: number = Math.round(size * scale);
    return Math.min(Math.max(scaledSize, size * 0.5), size * 1.5);
  },

  font: (size: number): number =>
    Math.round(
      PixelRatio.roundToNearestPixel(SCREEN_WIDTH / BASE_WIDTH) * size,
    ),

  moderate: (size: number, factor: number = 0.5): number => {
    const scale: number = Scale.size(size);
    const difference: number = scale - size;
    return Math.min(
      Math.max(size + difference * factor, size * 0.5),
      size * 1.5,
    );
  },

  spacing: (size: number): number => {
    return isTablet ? Scale.moderate(size) * 1.2 : Scale.moderate(size);
  },
  lineHeight: (fontSize: number, percentage = 1.45) => {
    return Math.round(fontSize * percentage);
  },
};

Dimensions.addEventListener("change", () => {
  const window = Dimensions.get("window");
  SCREEN_WIDTH = window.width;
  SCREEN_HEIGHT = window.height;
});
