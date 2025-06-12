import LoadingComponent from "@/components/Loading";
import { useAuthProvider } from "@/providers/auth";
import { COLORS } from "@/utils/colors";
import { Scale } from "@/utils/scaling";
import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import styles from "../styles/styles";
import Form from "./form/Form";
import ModalForm from "./modals";

const MainScreen = () => {
  const { loading } = useAuthProvider();

  return (
    <SafeAreaView
      style={{
        backgroundColor: COLORS.white,
      }}
      className="flex-1"
    >
      <ModalForm />

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

export default MainScreen;
