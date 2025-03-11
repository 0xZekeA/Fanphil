import { supabase } from "$root/lib/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import { Session } from "@supabase/supabase-js";
import * as SecureStore from "expo-secure-store";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { AuthProviderContextTypes } from "./authpro.types";
import useResetPasswordHooks from "./resetPassword.hooks";
import useSigninHooks from "./signin.hooks";
import useSignoutHooks from "./signout.hooks";
import useUserRealtimeData from "./user.hooks";

const AuthProviderContext = createContext<AuthProviderContextTypes | undefined>(
  undefined,
);

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [session, setSession] = useState<Session | null>(null);
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [loaded, setLoaded] = useState(false);
  const { data: user, updateUser } = useUserRealtimeData(
    session,
    setLoading,
    loaded,
  );
  const { signOut } = useSignoutHooks(setSession);
  const { resetPassword } = useResetPasswordHooks(user);
  const { control, onSubmit, errors, isSubmitting } = useSigninHooks(
    setSession,
    setSessionToken,
  );

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data?.session || null);
      if (session?.access_token) {
        setSessionToken(session.access_token);
        SecureStore.setItemAsync("session_token", session.access_token);
      }
      const isConnected = (await NetInfo.fetch()).isConnected;
      if (!isConnected) return;
      setLoaded(true);
    };

    checkSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setSession(newSession);
      },
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const getToken = async () => {
      try {
        const storedToken = await SecureStore.getItemAsync("session_token");
        if (storedToken) setSessionToken(storedToken);
      } catch (error) {
        console.error("Error retrieving session token:", error);
      }
    };
    getToken();
  }, []);

  const getUserId = async () => {
    const userId = await AsyncStorage.getItem("user_id");
    return userId || null;
  };

  return (
    <AuthProviderContext.Provider
      value={{
        session,
        setSession,
        user,
        control,
        onSubmit,
        errors,
        isSubmitting,
        loading,
        signOut,
        resetPassword,
        getUserId,
        updateUser,
        sessionToken,
      }}
    >
      {children}
    </AuthProviderContext.Provider>
  );
};
export default AuthProvider;

export const useAuthProvider = () => {
  const context = useContext(AuthProviderContext);
  if (!context) {
    throw new Error(
      "useAuthProvider must be used within a AuthProviderProvider",
    );
  }
  return context;
};
