import HapticsButton from "@/components/HapticsButton";
import { useAuthProvider } from "@/providers/auth";
import { showToast } from "@/utils/notification";
import React, { useCallback, useState } from "react";
import { Text, View } from "react-native";
import { useOnboardingScreenProvider } from "../../../providers/OnboardingScreenProvider";
import styles from "../../../styles/styles";

const ResetBtns = () => {
  const { resetPassword } = useAuthProvider();
  const { setIsPasswordResetModalShown, error, email } =
    useOnboardingScreenProvider();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(async () => {
    if (error || (error || "").length > 0) {
      showToast("error", "There are a few errors on your form");
      return;
    }
    setIsSubmitting(true);
    await resetPassword(email);
    setIsSubmitting(false);
    setIsPasswordResetModalShown(false);
  }, [email, error, resetPassword, setIsPasswordResetModalShown]);

  return (
    <View
      style={styles.resetBtnsContainer}
      className={`flex-row justify-between items-center`}
    >
      <HapticsButton
        style={{ flex: 7, zIndex: 5 }}
        onPress={() => setIsPasswordResetModalShown(false)}
      >
        <Text className="font-JakartaBold" style={styles.textSmLight}>
          Close
        </Text>
      </HapticsButton>
      <HapticsButton
        onPress={handleSubmit}
        style={styles.sendLinkBtn}
        disabled={isSubmitting}
        className="justify-end items-center"
      >
        <Text className="font-JakartaBold" style={styles.textSmWhite}>
          {isSubmitting ? "Sending" : "Send link"}
        </Text>
      </HapticsButton>
    </View>
  );
};

export default ResetBtns;
