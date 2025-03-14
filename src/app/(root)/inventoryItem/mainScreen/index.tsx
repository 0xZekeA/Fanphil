import BackButton from "@/components/BackButton";
import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import AddItemsForm from "../inventoryForm";
import styles from "../styles/styles";

const MainScreen = () => {
  const insets = useSafeAreaInsets();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.container, { paddingTop: insets.top }]}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <BackButton title="Inventory Item" />
        <AddItemsForm />
      </ScrollView>
      <Toast />
    </KeyboardAvoidingView>
  );
};

export default MainScreen;
