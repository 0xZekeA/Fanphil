import { icons } from "$root/constants/assets";
import IconButton from "@/components/IconButton";
import OnpressMessage from "@/components/onPressMessage";
import React from "react";
import { View } from "react-native";
import useOnPressMessageHooks from "../hooks/onPressMessage.hooks";
import SalesInfo from "./SalesInfo";

const TopSection = () => {
  const { showMessage, onClose, isMessageShown, position, message } =
    useOnPressMessageHooks();

  return (
    <View className="items-center justify-between flex-row">
      <SalesInfo />
      <IconButton icon={icons.bell} onPress={showMessage} />
      <OnpressMessage
        visible={isMessageShown}
        onClose={onClose}
        position={position}
        text={message}
        width={120}
      />
    </View>
  );
};

export default TopSection;
