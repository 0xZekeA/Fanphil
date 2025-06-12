// src/app/(auth)/onboarding/resetPassword.tsx
import BackButton from "@/components/BackButton";
import CustomButton from "@/components/customButton";
import InputField from "@/components/inputField/index";
import React from "react";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { fields } from "./constants/formSchema";
import useResetPassHooks from "./hooks/resetPass.hooks";
import styles from "./styles/styles";

const ResetPasswordScreen = () => {
  const insets = useSafeAreaInsets();
  const {
    control,
    errors,
    isSubmitting,
    onSubmit,
    isScreenDisabled,
    handleBack,
  } = useResetPassHooks();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView>
        <BackButton
          title="Reset Your Password"
          styling={styles.backBtn}
          onPress={handleBack}
        />
        <View style={styles.contentContainer}>
          <View style={styles.inputFieldContainer}>
            {fields.map((field) => (
              <InputField
                key={field.id}
                name={field.id}
                control={control}
                label={field.label}
                icon={field.leftIcon}
                iconRight={field.rightIcon ?? null}
                placeholder={field.placeholder}
                secureTextEntry={field.secure}
                error={errors[field.id]?.message}
                editable={!isScreenDisabled}
              />
            ))}
          </View>
          <View style={styles.buttonContainer}>
            <CustomButton
              title="Reset Password"
              onPress={onSubmit}
              disabled={isSubmitting || isScreenDisabled}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ResetPasswordScreen;
