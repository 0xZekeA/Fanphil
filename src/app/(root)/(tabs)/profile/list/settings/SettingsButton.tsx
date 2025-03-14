import { DataItem } from "@/types/profile";
import React from "react";
import { TouchableOpacity } from "react-native";
import { useProfileScreenContext } from "../../hooks/ProfileScreenProvider";
import styles from "../../styles/styles";
import Chevron from "./Chevron";
import TopSection from "./TopSection";

const SettingsButton = ({
  settings,
  index,
}: {
  settings: DataItem;
  index: number;
}) => {
  const { handlePress } = useProfileScreenContext();

  return (
    <TouchableOpacity
      key={index}
      onPress={(event: any) =>
        handlePress(
          event,
          (settings.haptic as "heavy" | "medium") ?? "light",
          settings.name,
        )
      }
      onLongPress={(event: any) =>
        handlePress(
          event,
          (settings.haptic as "heavy" | "medium") ?? "light",
          settings.name,
          !!settings.haptic,
        )
      }
      style={[styles.settingsContainer, { backgroundColor: settings.bgColor }]}
      className="flex-col"
    >
      <TopSection settings={settings} />
      <Chevron />
    </TouchableOpacity>
  );
};

export default SettingsButton;
