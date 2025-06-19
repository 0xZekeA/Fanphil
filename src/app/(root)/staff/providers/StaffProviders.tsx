import { useUsersProvider } from "@/providers/users/UsersProvider";
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from "react";
interface StaffProvidersContextTypes {
  users: User[];
  filteredUsers: User[];
  isViewMoreDisplayed: boolean;
  setIsViewMoreDisplayed: Dispatch<SetStateAction<boolean>>;
  isSelected: User | null;
  handleOnPress: (staff: User) => void;
}

const StaffProvidersContext = createContext<
  StaffProvidersContextTypes | undefined
>(undefined);

const StaffProviders = ({ children }: PropsWithChildren) => {
  const { users } = useUsersProvider();
  const [isViewMoreDisplayed, setIsViewMoreDisplayed] = useState(false);
  const [isSelected, setIsSelected] = useState<User | null>(null);

  const handleOnPress = (staff: User) => {
    setIsSelected(staff as User);
    setIsViewMoreDisplayed(true);
  };

  return (
    <StaffProvidersContext.Provider
      value={{
        users,
        filteredUsers: users,
        isViewMoreDisplayed,
        setIsViewMoreDisplayed,
        isSelected,
        handleOnPress,
      }}
    >
      {children}
    </StaffProvidersContext.Provider>
  );
};
export default StaffProviders;

export const useStaffProviders = () => {
  const context = useContext(StaffProvidersContext);
  if (!context) {
    throw new Error(
      "useStaffProviders must be used within a StaffProvidersProvider",
    );
  }
  return context;
};
