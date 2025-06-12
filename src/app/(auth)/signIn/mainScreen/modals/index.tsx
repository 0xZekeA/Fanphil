import Modal from "@/components/Modal";
import React, { memo } from "react";
import { Keyboard, TouchableWithoutFeedback, View } from "react-native";
import { useOnboardingScreenProvider } from "../../providers/OnboardingScreenProvider";
import styles from "../../styles/styles";
import PasswordResetAction from "./passwordReset";

const ModalForm = () => {
  const { isPasswordResetModalShown, setIsPasswordResetModalShown } =
    useOnboardingScreenProvider();

  return (
    <Modal
      isOpen={isPasswordResetModalShown}
      onClose={() => setIsPasswordResetModalShown(false)}
      withInput
    >
      {isPasswordResetModalShown && (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View
            style={styles.modalContainer}
            className="justify-center items-center"
          >
            <PasswordResetAction />
          </View>
        </TouchableWithoutFeedback>
      )}
    </Modal>
  );
};

export default memo(ModalForm);
