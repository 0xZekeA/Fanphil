import { router } from "expo-router";
import React from "react";
import { SafeAreaView, Text, TouchableOpacity } from "react-native";

const NotFound = () => {
  return (
    <SafeAreaView className="flex flex-1 justify-center items-center">
      <Text className="font-Jakarta text-lg">This page doesn't exist</Text>
      <TouchableOpacity
        onPress={() => {
          router.push("/");
        }}
      >
        <Text className="text-blue-600">Back Home</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default NotFound;
