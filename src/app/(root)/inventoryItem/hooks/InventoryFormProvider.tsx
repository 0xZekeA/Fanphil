import { updateInventory } from "@/database/inventory";
import { useAuthProvider } from "@/providers/auth";
import { showToast } from "@/utils/notification";
import { zodResolver } from "@hookform/resolvers/zod";
import { createContext, PropsWithChildren, useContext } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { inventoryFormSchema } from "../constants/form";
import { useItemProvider } from "./ItemProvider";
interface InventoryFormProviderContextTypes {
  onSubmit: () => void;
  control: any;
  errors: any;
  isSubmitting: boolean;
}

const InventoryFormProviderContext = createContext<
  InventoryFormProviderContextTypes | undefined
>(undefined);

const InventoryFormProvider = ({ children }: PropsWithChildren) => {
  const { user } = useAuthProvider();
  const { item } = useItemProvider();

  const form = inventoryFormSchema;

  type InventoryFormSchemaData = z.infer<typeof form>;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<InventoryFormSchemaData>({
    defaultValues: {
      name: item?.name,
      quantity: item?.quantity.toString(),
      costPrice: item?.cost_price.toString(),
      sellingPrice: item?.selling_price.toString(),
      size: item?.size.toString(),
      unit: item?.unit,
    },
    resolver: zodResolver(form),
    mode: "onChange",
  });

  const handleFormASubmission = async (
    form: InventoryFormSchemaData,
  ): Promise<void> => {
    if (!form || !item) return;

    if (!isDirty) {
      showToast("error", "You have to change atleast one thing");
      return;
    }

    if (!user) {
      showToast(
        "error",
        "An unexpected error occurred",
        "Please restart app or contact developer",
      );
      return;
    }
    try {
      const id = await updateInventory(
        item.id,
        form.name,
        form.quantity,
        form.costPrice,
        form.sellingPrice,
        form.sellingPrice,
        "0",
        form.size,
        form.unit,
        user.id,
      );
      if (id) {
        showToast(
          "success",
          `${form.name.split(" ")[0]} created and stored successfully`,
        );
        reset();
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

  const onSubmit = handleSubmit(handleFormASubmission);

  return (
    <InventoryFormProviderContext.Provider
      value={{
        onSubmit,
        control,
        errors,
        isSubmitting,
      }}
    >
      {children}
    </InventoryFormProviderContext.Provider>
  );
};
export default InventoryFormProvider;

export const useInventoryFormProvider = () => {
  const context = useContext(InventoryFormProviderContext);
  if (!context) {
    throw new Error(
      "useInventoryFormProvider must be used within a InventoryFormProviderProvider",
    );
  }
  return context;
};
