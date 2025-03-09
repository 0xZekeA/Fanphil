import { Stack } from "expo-router";

const RootLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="signIn/index" />
    </Stack>
  );
};

export default RootLayout;
