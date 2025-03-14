import { icons } from "$root/constants/assets";
import { Data } from "@/types/profile";
import { COLORS } from "@/utils/colors";

const profileData: Data[] = [
  {
    category: "Profile Settings",
    items: [
      {
        name: "User Information",
        icon: icons.userEdit,
        bgColor: COLORS.sky100,
      },
    ],
  },
  {
    category: "App Settings",
    items: [
      {
        name: "Notification Settings",
        icon: icons.notification,
        bgColor: COLORS.sky100,
      },
    ],
  },
  {
    category: "Account Settings",
    items: [
      {
        name: "Change Password",
        icon: icons.password,
        bgColor: COLORS.sky100,
        haptic: "medium",
      },
      {
        name: "Sign Out",
        icon: icons.signOut,
        bgColor: COLORS.beige100,
        haptic: "medium",
      },
    ],
  },
];

export default profileData;
