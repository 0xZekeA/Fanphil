export interface LoginFormData {
  email: string;
  password: string;
}

interface OnboardingScreenProviderContextTypes {
  isPasswordResetModalShown: boolean;
  setIsPasswordResetModalShown: React.Dispatch<React.SetStateAction<boolean>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  error?: string;
  setError: React.Dispatch<React.SetStateAction<string | undefined>>;
  emailString: string;
  isOTPVerShown: boolean;
  setIsOTPVerShown: React.Dispatch<React.SetStateAction<boolean>>;
}

type DisplayInput = {
  id: keyof RegistrationForm;
  placeholder: string;
  label: string;
  leftIcon: any;
  rightIcon?: any;
  secure?: boolean;
};
