import React from "react";
import { View } from "react-native";
import styles from "../../../styles/styles";
import MailImg from "./MailImg";
import ResetBtns from "./ResetBtns";
import ResetForm from "./ResetForm";

const PasswordResetAction = () => {
  return (
    <View style={styles.resetContainer} className="items-center justify-center">
      <MailImg />
      <ResetForm />
      <ResetBtns />
    </View>
  );
};

export default PasswordResetAction;
