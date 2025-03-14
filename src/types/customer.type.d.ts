declare interface CustomerFormType {
  email: string;
  name: string;
  role: string;
  phoneNumber: string;
  address: string;
}

declare interface CustomerForm {
  id: keyof CustomerFormType;
  label: string;
  placeholder: string;
  multiline?: boolean;
}

interface CustomerFormContextProps {
  onSubmit: () => void;
  control: any;
  errors: any;
  isSubmitting: boolean;
  isFormDisplayed: boolean;
  setIsFormDisplayed: (value: boolean) => void;
  handleAddUser: () => void;
}
