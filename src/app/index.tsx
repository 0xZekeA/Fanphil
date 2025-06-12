import { router } from "expo-router";
import { useEffect } from "react";
import LoadingComponent from "../components/Loading";
import { useAuthProvider } from "../providers/auth";

export default function Index() {
  const { sessionToken, loading } = useAuthProvider();

  useEffect(() => {
    const redirect = () => {
      if (sessionToken) {
        router.push("/(root)/(tabs)/home");
      } else router.push("/(auth)/signIn");
    };

    if (!loading) {
      const timeout = setTimeout(() => redirect(), 200);
      return () => clearTimeout(timeout);
    }
  }, [loading, sessionToken]);

  return <LoadingComponent loading={loading} />;
}
