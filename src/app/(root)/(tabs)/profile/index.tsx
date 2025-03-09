import React from "react";
import { Text } from "react-native";
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import styles from "./styles/styles";

const Profile = () => {
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
        <Text>Profile</Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Profile;
