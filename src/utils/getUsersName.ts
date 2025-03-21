export const getUsersName = (userId: string, users: User[]) => {
  const name = users.find((u) => u.id === userId)?.full_name || "User";

  return name.split(" ")[0];
};

export const formatItem = (str: string) =>
  str.length > 16 ? str.slice(0, 16) + "..." : str;
