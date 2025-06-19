export const getUsersName = (userId: string, usersMap: Map<string, User>) => {
  const name = usersMap.get(userId)?.full_name || "User";

  return name.split(" ")[0];
};

export const formatItem = (str: string) =>
  str.length > 16 ? str.slice(0, 16) + "..." : str;
