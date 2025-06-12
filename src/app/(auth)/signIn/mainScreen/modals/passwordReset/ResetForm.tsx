import { icons } from "$root/constants/assets";
import ErrorAndForgotPassword from "@/components/inputField/ErrorAndForgotPass";
import Field from "@/components/inputField/Field";
import React, { useCallback } from "react";
import { Text, View } from "react-native";
import { emailSchema } from "../../../constant/onboardingForm";
import { useOnboardingScreenProvider } from "../../../providers/OnboardingScreenProvider";
import styles from "../../../styles/styles";

const ResetForm = () => {
  const { email, setEmail, error, setError } = useOnboardingScreenProvider();

  const handleTxtChange = useCallback(
    (value: string) => {
      setEmail(value);

      const result = emailSchema.safeParse(value);

      setError(result.success ? undefined : result.error.issues[0].message);
    },
    [setEmail, setError],
  );

  return (
    <View style={styles.resetForm} className="justify-center items-center">
      <Text style={styles.textBase} className="font-JakartaMedium">
        Reset email will be sent to
      </Text>
      <View style={{ width: "100%" }}>
        <Field
          placeholder="What's your email?"
          icon={icons.email}
          onChangeText={handleTxtChange}
          value={email}
        />
        <ErrorAndForgotPassword error={error} />
      </View>
    </View>
  );
};

export default ResetForm;
