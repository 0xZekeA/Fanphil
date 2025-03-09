import React from "react";
import { ActivityIndicator } from "react-native";
import { COLORS } from "../utils/colors";
import Modal from "./Modal";

const LoadingComponent = ({ loading }: { loading: boolean }) => {
  return (
    <Modal isOpen={loading} onClose={() => null}>
      <ActivityIndicator size="small" color={COLORS.white} />
    </Modal>
  );
};

export default LoadingComponent;
