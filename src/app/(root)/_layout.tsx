import { useAuthProvider } from "@/providers/auth";
import { Stack } from "expo-router";
import Toast from "react-native-toast-message";

const RootLayout = () => {
  const { getUserId } = useAuthProvider();
  const userId = getUserId();
  if (!userId) {
    return;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Toast />
    </Stack>
  );
};

export default RootLayout;
