import { icons } from "$root/constants/assets";
import HapticButton from "@/components/HapticsButton";
import { router } from "expo-router";
import React from "react";
import { Image } from "react-native";
import styles from "../styles/styles";
import ProgressBar from "./ProgressBar";

const SellersUpdateBar = () => {
  return (
    <HapticButton
      style={styles.updateBtn}
      className="justify-center items-center flex-row"
      onPress={() => router.push("/(root)/sellersInventory")}
    >
      <ProgressBar />
      <Image source={icons.smallChevron} style={styles.icons} />
    </HapticButton>
  );
};

export default SellersUpdateBar;
