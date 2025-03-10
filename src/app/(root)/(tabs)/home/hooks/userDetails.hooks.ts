import { useAuthProvider } from "@/providers/auth";
import { capitalizeItem } from "@/utils/capitalize";

const useUserDetailsHooks = () => {
  const { user } = useAuthProvider();

  const name = user ? (user?.full_name || "").split(" ")[0] : "User";
  const firstName = capitalizeItem(name);

  const role = user?.role || "Driver";

  return { firstName, role };
};

export default useUserDetailsHooks;
