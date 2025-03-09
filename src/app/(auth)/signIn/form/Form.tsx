import CustomButton from "@/src/components/customButton";
import { useAuthProvider } from "@/src/providers/auth";
import React from "react";
import { View } from "react-native";
import Fields from "./Fields";

const Form = () => {
  const { control, errors, onSubmit, isSubmitting } = useAuthProvider();

  return (
    <View style={{ width: "100%" }}>
      <Fields control={control} errors={errors} />
      <CustomButton
        title={isSubmitting ? "Loging in..." : "Sign In"}
        onPress={onSubmit}
        disabled={isSubmitting}
      />
    </View>
  );
};

export default Form;
