import "$root/global.css";
import "$root/lib/supastash";
import useRecoverySession from "@/hooks/recoverySession.hooks";
import FinanceProvider from "@/providers/finances/FinanceProvider";
import InventoryProvider from "@/providers/inventory/InventoryProvider";
import SalesProvider from "@/providers/sales/SalesProvider";
import UsersProvider from "@/providers/users/UsersProvider";
import { linking } from "@/utils/supabaseRecoveryUrl";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import Toast from "react-native-toast-message";
import { useSupastash } from "supastash";
import AuthProvider from "../providers/auth";

SplashScreen.preventAutoHideAsync();

export const unstable_settings = { initialRouteName: "index", linking };

export default function RootLayout() {
  useRecoverySession();
  const { dbReady } = useSupastash();

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

  if (!loaded || !dbReady) {
    return null;
  }

  return (
    <React.Fragment>
      <GestureHandlerRootView>
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
                </UsersProvider>
              </FinanceProvider>
            </SalesProvider>
          </InventoryProvider>
        </AuthProvider>
      </GestureHandlerRootView>
      <Toast />
    </React.Fragment>
  );
}
