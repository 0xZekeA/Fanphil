import { createContext, PropsWithChildren, useContext } from "react";
import { useAuthProvider } from "../auth";
import useRealtimeData from "../realtimeData";
import useCreateUserHooks from "./createUser.hooks";

const UsersProviderContext = createContext<
  UsersProviderContextTypes | undefined
>(undefined);

const UsersProvider = ({ children }: PropsWithChildren) => {
  const users = useRealtimeData("users");
  const { user } = useAuthProvider();
  const { createAgent } = useCreateUserHooks(user);

  const sellers: User[] = useRealtimeData("users").filter(
    (user) => user.role === "Driver",
  );

  return (
    <UsersProviderContext.Provider value={{ users, sellers, createAgent }}>
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
