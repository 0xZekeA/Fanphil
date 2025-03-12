import React from "react";
import { ActivityIndicator, Modal, View } from "react-native";
import { COLORS } from "../utils/colors";

const LoadingComponent = ({ loading }: { loading?: boolean }) => {
  return (
    loading && (
      <Modal transparent={true} animationType="fade">
        <View className="flex-1 bg-black/5 justify-center items-center">
          <ActivityIndicator size="small" color={COLORS.black} />
        </View>
      </Modal>
    )
  );
};

export default LoadingComponent;
