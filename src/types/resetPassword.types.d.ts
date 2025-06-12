type PasswordFormData = {
  password1: string;
  password2: string;
};

type ResetPassInput = {
  id: keyof PasswordFormData;
  placeholder: string;
  label: string;
  leftIcon: any;
  rightIcon: any;
  secure: boolean;
};
