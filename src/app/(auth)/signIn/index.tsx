import LoadingComponent from "@/src/components/Loading";
import { useAuthProvider } from "@/src/providers/auth";
import { COLORS } from "@/src/utils/colors";
import { Scale } from "@/src/utils/scaling";
import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Form from "./form/Form";

const SignIn = () => {
  const { loading } = useAuthProvider();

  return (
    <SafeAreaView
      style={{
        backgroundColor: COLORS.white,
      }}
      className="flex-1"
    >
      <ScrollView style={{ paddingTop: Scale.moderate(80) }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View
              style={{ width: "100%" }}
              className="justify-center items-center flex-col"
            >
              <LoadingComponent loading={loading} />

              <View
                style={{ width: "80%", rowGap: Scale.moderate(48) }}
                className="justify-center items-center flex-col"
              >
                <Text style={styles.header} className="font-JakartaSemiBold">
                  Sign in to Fanphil POS
                </Text>
                <Form />
              </View>
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  header: {
    fontSize: Scale.font(20),
    lineHeight: Scale.lineHeight(20),
    color: COLORS.gray700,
  },
});
