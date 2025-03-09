import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
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
  const [loading, setLoading] = useState<boolean>(true);
  const [loaded, setLoaded] = useState(false);

  const { data: user } = useUserRealtimeData(session, setLoading, loaded);
  const { signOut } = useSignoutHooks(setSession);
  const { resetPassword } = useResetPasswordHooks(user);
  const { control, onSubmit, errors, isSubmitting } =
    useSigninHooks(setSession);

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data?.session || null);
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
