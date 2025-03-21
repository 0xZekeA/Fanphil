import { addExpense } from "@/database/expense";
import { useAuthProvider } from "@/providers/auth";
import { ExpenseContextProps } from "@/types/finances.types";
import { showToast } from "@/utils/notification";
import { zodResolver } from "@hookform/resolvers/zod";
import { createContext, PropsWithChildren, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const ExpenseFormContext = createContext<ExpenseContextProps | undefined>(
  undefined,
);

const ExpenseProviders = ({ children }: PropsWithChildren) => {
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const { user } = useAuthProvider();

  const expenseFormSchema = z.object({
    reason: z
      .string()
      .min(1, "Reason is required")
      .min(12, "Give a reason with at least 12 characters"),
    amount: z
      .string()
      .min(1, "Amount is required")
      .regex(/^\d+$/, "Only digits are allowed")
      .transform((val) => Number(val))
      .refine((val) => val >= 100, { message: "Amount must be above ₦100" })
      .refine((val) => val <= 1000000, { message: "Cash limit is ₦1,000,000" }),
  });

  type ExpenseFormSchemaData = z.infer<typeof expenseFormSchema>;

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ExpenseFormSchemaData>({
    defaultValues: {
      reason: "",
      amount: 0,
    },
    resolver: zodResolver(expenseFormSchema),
    mode: "onChange",
  });

  const handleAddExpenses = async (form: ExpenseFormSchemaData) => {
    try {
      if (!user) {
        showToast("error", "Please try refreshing your app");
        return;
      }

      const id = await addExpense(form.reason, form.amount, user.id);

      if (!id) throw Error("Unsuccessful entry");

      showToast("success", "Expense as been stored successfully");

      reset();
    } catch (error: any) {
      showToast("error", `Error message: ${error.message}`);
    } finally {
      setTimeout(() => setIsExpenseModalOpen(false), 1000);
    }
  };

  const onSubmit = handleSubmit(handleAddExpenses);

  return (
    <ExpenseFormContext.Provider
      value={{
        onSubmit,
        control,
        errors,
        isSubmitting,
        setIsExpenseModalOpen,
        isExpenseModalOpen,
      }}
    >
      {children}
    </ExpenseFormContext.Provider>
  );
};

export default ExpenseProviders;

export const useExpenseFormContext = () => {
  const context = useContext(ExpenseFormContext);
  if (!context) {
    throw new Error("useExpenseContext must be used within an ExpenseProvider");
  }
  return context;
};
