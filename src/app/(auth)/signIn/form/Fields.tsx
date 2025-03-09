import { icons } from "$root/constants/assets";
import InputField from "@/components/inputField";
import { LoginFormData } from "@/types/auth.type";
import { Scale } from "@/utils/scaling";
import React from "react";
import { Control, FieldErrors } from "react-hook-form";
import { StyleSheet, View } from "react-native";

const Fields = ({
  control,
  errors,
}: {
  control: Control<LoginFormData>;
  errors: FieldErrors<LoginFormData>;
}) => {
  return (
    <View style={styles.container}>
      <InputField
        name="email"
        label="Email"
        control={control}
        placeholder="Enter your email"
        icon={icons.email}
        error={errors.email?.message}
      />

      <InputField
        name="password"
        label="Password"
        control={control}
        placeholder="Enter your Password"
        icon={icons.lock}
        iconRight={icons.eyecross}
        showForgotPassword
        secureTextEntry
        error={errors.password?.message}
      />
    </View>
  );
};

export default Fields;

const styles = StyleSheet.create({
  container: {
    rowGap: Scale.moderate(16),
    width: "100%",
    marginBottom: Scale.moderate(32),
  },
});
