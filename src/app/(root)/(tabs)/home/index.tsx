import React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Greetings from "./greetings";
import styles from "./styles/styles";

const Home = () => {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Greetings />
    </View>
  );
};

export default Home;
