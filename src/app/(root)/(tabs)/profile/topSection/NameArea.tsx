import { useAuthProvider } from "@/providers/auth";
import { COLORS } from "@/utils/colors";
import { Scale } from "@/utils/scaling";
import React from "react";
import { Text, View } from "react-native";
import styles from "../styles/styles";

const NameArea = () => {
  const { user } = useAuthProvider();
  return (
    <View style={{ rowGap: Scale.moderate(4) }} className="justify-start">
      <Text style={styles.textName} className="font-Jakarta">
        {(user?.full_name || "").split(" ").slice(0, 2).join(" ") || "User"}
      </Text>

      <Text
        style={[styles.textName, { color: COLORS.gray500 }]}
        className="font-Jakarta"
      >
        {user?.email.toLowerCase() || ""}
      </Text>
    </View>
  );
};

export default NameArea;
