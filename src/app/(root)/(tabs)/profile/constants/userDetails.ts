import { UserDetailsTypes } from "@/types/profile";
import { formatDate } from "@/utils/formatDate";

const userInfo: UserDetailsTypes = (user: User | null) => {
  if (!user) return;

  const commonDetails = [
    { category: "Phone number", item: user.phone_number },
    { category: "Status", item: user.is_active === 1 ? "Active" : "Suspended" },
  ];

  if (user.role === "Creator" || user.role === "Owner") {
    return [
      ...commonDetails,
      { category: "Role", item: user.role },
      {
        category: "Joined Date",
        item: formatDate(user.created_at || "", "short"),
      },
    ].filter((det) => det !== undefined);
  }

  const agentDetails = [
    { category: "Address", item: user.address },
    {
      category: "Hire Date",
      item: formatDate(user.created_at || "", "short"),
    },
  ].filter((det) => det !== undefined);

  return agentDetails;
};

export default userInfo;
