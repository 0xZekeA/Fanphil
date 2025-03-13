declare interface UserFormType {
  email: string;
  name: string;
  role: string;
  phoneNumber: string;
  address: string;
}

declare interface UserForm {
  id: keyof UserFormType;
  label: string;
  placeholder: string;
  multiline?: boolean;
}

declare interface Action {
  type?: string;
  onPress?: any;
  item?: any;
  category?: string;
  destructive?: boolean;
}

interface StaffFormsContextProps {
  image: string | null;
  handleImage: () => Promise<void>;
  onSubmit: () => void;
  control: any;
  errors: any;
  isSubmitting: boolean;
  isFormDisplayed: boolean;
  setIsFormDisplayed: (value: boolean) => void;
  handleAddUser: () => void;
}

interface MenuOptionsContextProps {
  isAdmin: boolean;
  menuItems: any;
  contextMenu: ContextMenuTypes;
  setContextMenu: Dispatch<SetStateAction<ContextMenuTypes>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  isConfirmOption: boolean;
  action: Action | null;
  onModalClose: () => void;
  isModalOpen: boolean;
  modalHeaderText: string;
  setIsConfirmOption: Dispatch<SetStateAction<boolean>>;
  setAction: Dispatch<SetStateAction<Action | null>>;
  handleLongPress: (item: any, event: any) => void;
}
