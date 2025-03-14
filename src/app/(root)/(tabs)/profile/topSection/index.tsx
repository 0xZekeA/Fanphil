import { Scale } from "@/utils/scaling";
import React from "react";
import { View } from "react-native";
import { useProfileScreenContext } from "../hooks/ProfileScreenProvider";
import styles from "../styles/styles";
import NameArea from "./NameArea";
import OrderCount from "./OrderCount";
import Viewer from "./pfp/ImageViewer";
import Pfp from "./pfp/Pfp";

const DetailsSection = () => {
  const { isUserDetailsShown } = useProfileScreenContext();

  return (
    <View
      style={[
        styles.detailsContainer,
        {
          marginTop: isUserDetailsShown
            ? Scale.moderate(8)
            : Scale.moderate(20),
        },
      ]}
    >
      <Viewer />
      <View
        style={{
          marginTop: Scale.moderate(8),
          marginBottom: Scale.moderate(16),
        }}
        className="justify-between flex-row items-start"
      >
        <Pfp />
        <OrderCount />
      </View>
      <View style={{ rowGap: Scale.moderate(4) }} className="justify-start">
        <NameArea />
      </View>
    </View>
  );
};

export default DetailsSection;
