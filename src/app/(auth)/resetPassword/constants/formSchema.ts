import { icons } from "$root/constants/assets";
import { z } from "zod";

const passwordSchema = z
  .object({
    password1: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters"),
    password2: z
      .string()
      .min(1, "Please confirm your password")
      .min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.password1 === data.password2, {
    message: "Passwords must match",
    path: ["password2"],
  });

export const fields: ResetPassInput[] = [
  {
    id: "password1",
    placeholder: "Enter password",
    leftIcon: icons.lock,
    rightIcon: icons.eyecross,
    label: "New Password",
    secure: true,
  },
  {
    id: "password2",
    placeholder: "Confirm password",
    leftIcon: icons.lock,
    rightIcon: icons.eyecross,
    label: "Confirm Password",
    secure: true,
  },
];

export default passwordSchema;
