import { useAuthProvider } from "@/providers/auth";
import { OnboardingScreenProviderContextTypes } from "@/types/auth.type";
import { createContext, PropsWithChildren, useContext, useState } from "react";
import { useWatch } from "react-hook-form";

const OnboardingScreenProviderContext = createContext<
  OnboardingScreenProviderContextTypes | undefined
>(undefined);

const OnboardingScreenProvider = ({ children }: PropsWithChildren) => {
  const { control } = useAuthProvider();
  const [isOTPVerShown, setIsOTPVerShown] = useState(false);
  const emailString = useWatch({ control, name: "email" });

  const [isPasswordResetModalShown, setIsPasswordResetModalShown] =
    useState(false);
  const [email, setEmail] = useState(emailString ?? "");
  const [error, setError] = useState<string>();

  return (
    <OnboardingScreenProviderContext.Provider
      value={{
        isPasswordResetModalShown,
        setIsPasswordResetModalShown,
        email,
        setEmail,
        error,
        setError,
        emailString,
        setIsOTPVerShown,
        isOTPVerShown,
      }}
    >
      {children}
    </OnboardingScreenProviderContext.Provider>
  );
};
export default OnboardingScreenProvider;

export const useOnboardingScreenProvider = () => {
  const context = useContext(OnboardingScreenProviderContext);
  if (!context) {
    throw new Error(
      "useOnboardingScreenProvider must be used within a OnboardingScreenProviderProvider",
    );
  }
  return context;
};
