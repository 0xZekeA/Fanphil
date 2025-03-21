import { addCustomer } from "@/database/customer";
import { useUsersProvider } from "@/providers/users/UsersProvider";
import { showToast } from "@/utils/notification";
import { zodResolver } from "@hookform/resolvers/zod";
import { createContext, PropsWithChildren, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { customerFormSchema } from "../constants/form";

const CustomerFormContext = createContext<CustomerFormContextProps | undefined>(
  undefined,
);

const CustomerFormProvider = ({ children }: PropsWithChildren) => {
  const { createUser } = useUsersProvider();

  const [isFormDisplayed, setIsFormDisplayed] = useState(false);

  const form = customerFormSchema;

  type CustomerFormSchemaData = z.infer<typeof form>;

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CustomerFormSchemaData>({
    defaultValues: {
      name: "",
      phoneNumber: "",
      address: "",
    },
    resolver: zodResolver(form),
    mode: "onChange",
  });

  const onCloseForm = () => setIsFormDisplayed(false);

  const handleFormASubmission = async (
    form: CustomerFormSchemaData,
  ): Promise<void> => {
    if (!form) return;
    try {
      const id = await addCustomer(form.name, form.phoneNumber, form.address);

      if (id) {
        showToast(
          "success",
          `Customer ${form.name.split(" ")[0]} created and stored successfully`,
        );
        setTimeout(() => onCloseForm(), 1000);
      }
    } catch (error: any) {
      console.error("Error creating agent: ", error);
      showToast(
        "error",
        "An unexpected error occurred",
        `Error details: ${error.message}`,
      );
    }
  };

  const handleAddUser = () => {
    setIsFormDisplayed(true);
  };

  const onSubmit = handleSubmit(handleFormASubmission);

  return (
    <CustomerFormContext.Provider
      value={{
        onSubmit,
        control,
        errors,
        isSubmitting,
        isFormDisplayed,
        setIsFormDisplayed,
        handleAddUser,
      }}
    >
      {children}
    </CustomerFormContext.Provider>
  );
};

export default CustomerFormProvider;

export const useCustomerForm = () => {
  const context = useContext(CustomerFormContext);
  if (!context) {
    throw new Error("useStaffForms must be used within a CustomerFormProvider");
  }
  return context;
};
