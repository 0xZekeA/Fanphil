import { router } from "expo-router";
import { useEffect } from "react";

export default function Index() {
  useEffect(() => {
    const redirect = () =>
      setTimeout(() => router.push("/(root)/(tabs)/home"), 200);
    redirect();
  }, []);

  //   useEffect(() => {
  //     const redirect = () => {
  //       if (!loading && isAuthenticated && userData) {
  //         if (userData.role === "Founder" || userData.role === "Manager") {
  //           router.replace("/(adminRoot)/(tabs)/home");
  //         } else if (userData.role === "Agent") {
  //           router.replace("/(root)/(tabs)/home");
  //         }
  //       } else if (!loading && !isAuthenticated) {
  //         router.replace("/(auth)/signIn");
  //       }
  //     };

  //     if (!loading) {
  //       console.log(userData);
  //       redirect();
  //     }
  //   }, [isAuthenticated, loading, userData]);

  //   if (loading || (isAuthenticated && !userData)) {
  //     return (
  //       <>
  //         <Modal transparent={true} animationType="fade">
  //           <View className="flex-1 bg-black/5 justify-center items-center">
  //             <ActivityIndicator size="small" color="#000" />
  //           </View>
  //         </Modal>
  //         <Toast />
  //       </>
  //     );
  //   }

  return null;
}
