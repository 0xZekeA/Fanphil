import { Scale } from "@/utils/scaling";
import React from "react";
import { View } from "react-native";
import BottomSection from "./BottomSection";
import TopSection from "./TopSection";

const Details = ({ user }: { user: User }) => {
  return (
    <View style={{ columnGap: Scale.moderate(4) }} className="flex-col flex-1">
      <TopSection user={user} />
      <BottomSection user={user} />
    </View>
  );
};

export default Details;
