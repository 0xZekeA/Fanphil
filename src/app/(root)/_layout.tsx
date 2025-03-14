import { useAuthProvider } from "@/providers/auth";
import { Stack } from "expo-router";

const RootLayout = () => {
  const { getUserId } = useAuthProvider();
  const userId = getUserId();
  if (!userId) {
    return;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
};

export default RootLayout;
