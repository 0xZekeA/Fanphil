import { Scale } from "@/src/utils/scaling";
import React from "react";
import {
  KeyboardAvoidingView,
  ModalProps,
  Platform,
  Pressable,
  Modal as RNModal,
  StyleSheet,
} from "react-native";
import Toast from "react-native-toast-message";

type CustomModalProps = ModalProps & {
  isOpen: boolean;
  withInput?: boolean;
  onClose: () => void;
};

const Modal = ({
  isOpen,
  withInput,
  children,
  onClose,
  ...rest
}: CustomModalProps) => {
  const content = withInput ? (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <Pressable
        onPress={onClose}
        style={styles.contentContainer}
        className="items-center justify-center flex-1"
      >
        <Pressable>{children}</Pressable>
      </Pressable>
    </KeyboardAvoidingView>
  ) : (
    <Pressable
      style={styles.contentContainer}
      className="items-center justify-center flex-1"
      onPress={onClose}
    >
      <Pressable>{children}</Pressable>
    </Pressable>
  );

  return (
    <RNModal
      visible={isOpen}
      transparent
      animationType="fade"
      statusBarTranslucent
      {...rest}
    >
      {content}
      <Toast />
    </RNModal>
  );
};

export default Modal;

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: Scale.moderate(12),
    backgroundColor: "rgba(24, 24, 27 / 0.05)",
  },
});
