import { z } from "zod";

const agentForm: UserForm[] = [
  {
    id: "email",
    label: "Email Address",
    placeholder: "user@gmail.com",
  },
  {
    id: "name",
    label: "Full Name",
    placeholder: "John Doe",
  },
  {
    id: "role",
    label: "Role",
    placeholder: "Manager, Driver, or Owner",
  },
  {
    id: "phoneNumber",
    label: "Phone Number",
    placeholder: "08012345678",
  },
  {
    id: "address",
    label: "Address",
    placeholder: "24 Ofulonu, Off Jimmy Street...",
    multiline: true,
  },
];

const validRoles = ["Manager", "Driver", "Owner"];

export const staffFormSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email format"),

  name: z
    .string()
    .min(1, "Name is required")
    .regex(
      /^\b[A-Za-z]{2,}\b(?:\s+\b[A-Za-z]{2,}\b)+$/,
      "Enter at least two valid names",
    )
    .max(50, "Name is too long"),

  role: z.string().refine((val) => validRoles.includes(val), {
    message: "Role must be Manager, Driver, or Owner",
  }),

  phoneNumber: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^\d{10,15}$/, "Phone number must be between 10 and 15 digits"),

  address: z
    .string()
    .min(15, "Address must be at least 15 characters long")
    .max(100, "Address is too long"),
});

export default agentForm;
