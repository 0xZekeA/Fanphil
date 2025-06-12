import { icons } from "$root/constants/assets";
import { DisplayInput } from "@/types/auth.type";
import { z } from "zod";

const displayInput = (type: "signUp" | "signIn") => {
  const fields: DisplayInput[] = [
    {
      id: "name",
      placeholder: "What's your name?",
      leftIcon: icons.person,
      label: "Full name",
    },
    {
      id: "email",
      placeholder: "Enter email",
      leftIcon: icons.email,
      label: "Email",
    },
    {
      id: "password",
      placeholder: "Enter password",
      leftIcon: icons.lock,
      rightIcon: icons.eyecross,
      label: "Password",
      secure: true,
    },
  ];

  switch (type) {
    case "signUp":
      return fields;
    case "signIn":
      return fields.slice(1);
    default:
      break;
  }
};

export const emailSchema = z
  .string()
  .min(1, "Email is required")
  .email("Please enter a valid email");

export default displayInput;
