import { Data } from "@/types/profile";
import { Scale } from "@/utils/scaling";
import React from "react";
import { Text, View } from "react-native";
import styles from "../../styles/styles";
import SettingsButton from "./SettingsButton";

const Settings = ({ item }: { item: Data }) => {
  return (
    <View style={styles.settingsItem} className="justify-start">
      <Text style={styles.textCategoryHeader} className="font-JakartaMedium">
        {item.category}
      </Text>
      <View style={{ rowGap: Scale.moderate(12) }}>
        {item.items.map((settings, index) => (
          <SettingsButton key={index} settings={settings} index={index} />
        ))}
      </View>
    </View>
  );
};

export default Settings;
