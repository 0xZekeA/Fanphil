import "$root/global.css";
import { setupDatabase } from "@/database/schema";
import FinanceProvider from "@/providers/finances/FinanceProvider";
import InventoryProvider from "@/providers/inventory/InventoryProvider";
import { initializeSync } from "@/providers/realtimeData/sync";
import SalesProvider from "@/providers/sales/SalesProvider";
import UsersProvider from "@/providers/users/UsersProvider";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useRef, useState } from "react";
import { StatusBar } from "react-native";
import "react-native-reanimated";
import Toast from "react-native-toast-message";
import AuthProvider from "../providers/auth";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [dbReady, setDbReady] = useState(false);
  const isInitialized = useRef(false);

  const [loaded] = useFonts({
    "Jakarta-Bold": require("@/assets/fonts/PlusJakartaSans-Bold.ttf"),
    "Jakarta-ExtraBold": require("@/assets/fonts/PlusJakartaSans-ExtraBold.ttf"),
    "Jakarta-ExtraLight": require("@/assets/fonts/PlusJakartaSans-ExtraLight.ttf"),
    "Jakarta-Light": require("@/assets/fonts/PlusJakartaSans-Light.ttf"),
    "Jakarta-Medium": require("@/assets/fonts/PlusJakartaSans-Medium.ttf"),
    "Jakarta-Regular": require("@/assets/fonts/PlusJakartaSans-Regular.ttf"),
    "Jakarta-SemiBold": require("@/assets/fonts/PlusJakartaSans-SemiBold.ttf"),
    "Poppins-Regular": require("@/assets/fonts/Poppins-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    if (isInitialized.current) return;

    const initialize = async () => {
      try {
        await setupDatabase();
        initializeSync();
        isInitialized.current = true;
        setDbReady(true);
      } catch (error) {
        console.error("Failed to initialize:", error);
      }
    };

    initialize();
  }, []);

  if (!loaded || !dbReady) {
    return null;
  }

  return (
    <AuthProvider>
      <InventoryProvider>
        <SalesProvider>
          <FinanceProvider>
            <UsersProvider>
              <StatusBar
                translucent
                backgroundColor={"transparent"}
                barStyle={"dark-content"}
              />
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="index" />
                <Stack.Screen name="(auth)" />
                <Stack.Screen
                  name="(root)"
                  options={{ gestureEnabled: false }}
                />
                <Stack.Screen name="+not-found" />
              </Stack>
              <Toast />
            </UsersProvider>
          </FinanceProvider>
        </SalesProvider>
      </InventoryProvider>
    </AuthProvider>
  );
}
