import { z } from "zod";

const customerForm: CustomerForm[] = [
  {
    id: "name",
    label: "Full Name",
    placeholder: "John Doe",
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

export const customerFormSchema = z.object({
  name: z.string().min(1, "Name is required").max(50, "Name is too long"),

  phoneNumber: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^\d{10,15}$/, "Phone number must be between 10 and 15 digits"),

  address: z
    .string()
    .min(15, "Address must be at least 15 characters long")
    .max(100, "Address is too long"),
});

export default customerForm;
