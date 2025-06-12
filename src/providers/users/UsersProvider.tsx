import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import { useSupastashData } from "supastash";
import { useAuthProvider } from "../auth";
import useCreateUserHooks from "./createUser.hooks";

const UsersProviderContext = createContext<
  UsersProviderContextTypes | undefined
>(undefined);

const UsersProvider = ({ children }: PropsWithChildren) => {
  const { data: users } = useSupastashData<User>("users");
  const { user } = useAuthProvider();
  const { createUser } = useCreateUserHooks(user);

  const sellers = useMemo(
    () => users?.filter((user) => user.role === "Driver"),
    [users],
  );

  return (
    <UsersProviderContext.Provider value={{ users, sellers, createUser }}>
      {children}
    </UsersProviderContext.Provider>
  );
};
export default UsersProvider;

export const useUsersProvider = () => {
  const context = useContext(UsersProviderContext);
  if (!context) {
    throw new Error(
      "useUsersProvider must be used within a UsersProviderProvider",
    );
  }
  return context;
};
