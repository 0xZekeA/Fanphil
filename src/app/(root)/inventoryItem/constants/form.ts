import { z } from "zod";

const inventoryForm: ItemFields[] = [
  {
    id: "name",
    label: "Name",
    placeholder: "Checkers",
    useNumberPad: false,
    isEditable: true,
  },
  {
    id: "quantity",
    label: "Stock Quantity",
    placeholder: "120",
    useNumberPad: true,
    isEditable: false,
  },
  {
    id: "costPrice",
    label: "Cost Price",
    placeholder: "2400",
    useNumberPad: true,
  },
  {
    id: "sellingPrice",
    label: "Selling Price",
    placeholder: "3200",
    useNumberPad: true,
  },
  {
    id: "size",
    label: "Size",
    placeholder: "12",
    useNumberPad: true,
    isEditable: true,
  },
  {
    id: "unit",
    label: "Unit",
    placeholder: "kg",
    useNumberPad: false,
    isEditable: true,
  },
];

export const inventoryFormSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),

  quantity: z
    .string()
    .regex(/^\d+$/, "Quantity must be a whole number")
    .min(1, "Quantity is required"),

  costPrice: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, "Cost price must be a valid number")
    .min(1, "Cost price is required"),

  sellingPrice: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, "Selling price must be a valid number")
    .min(1, "Selling price is required"),

  size: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, "Size must be a valid number")
    .min(1, "Size is required"),

  unit: z.string().min(1, "Unit is required").max(20, "Unit is too long"),
});

export default inventoryForm;
