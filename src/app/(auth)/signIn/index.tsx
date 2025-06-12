import React from "react";
import MainScreen from "./mainScreen";
import OnboardingScreenProvider from "./providers/OnboardingScreenProvider";

const SignIn = () => {
  return (
    <OnboardingScreenProvider>
      <MainScreen />
    </OnboardingScreenProvider>
  );
};

export default SignIn;
