import { useUsersProvider } from "@/providers/users/UsersProvider";
import { showToast } from "@/utils/notification";
import { pickImage } from "@/utils/staff/imageUpload";
import { zodResolver } from "@hookform/resolvers/zod";
import * as ImagePicker from "expo-image-picker";
import { createContext, PropsWithChildren, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Alert } from "react-native";
import { z } from "zod";
import { staffFormSchema } from "../constants/form";

const StaffFormsContext = createContext<StaffFormsContextProps | undefined>(
  undefined,
);

const StaffFormsProvider = ({ children }: PropsWithChildren) => {
  const { createUser } = useUsersProvider();

  const [isFormDisplayed, setIsFormDisplayed] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  const [cameraPermission, requestCameraPermission] =
    ImagePicker.useCameraPermissions();
  const [mediaPermission, requestMediaPermission] =
    ImagePicker.useMediaLibraryPermissions();

  const form = staffFormSchema;

  type StaffFormSchemaData = z.infer<typeof form>;

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<StaffFormSchemaData>({
    defaultValues: {
      email: "",
      name: "",
      role: "",
      phoneNumber: "",
      address: "",
    },
    resolver: zodResolver(form),
    mode: "onChange",
  });

  const onCloseForm = () => setIsFormDisplayed(false);

  const handleFormASubmission = async (
    form: StaffFormSchemaData,
  ): Promise<void> => {
    if (!form) return;
    try {
      const agentCreation = await createUser(form, image || null);
      if (agentCreation?.success) {
        showToast(
          "success",
          `${
            form.role + " " + form.name.split(" ")[0]
          } created and stored successfully`,
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

  const handleImage = async () => {
    if (!cameraPermission?.granted || cameraPermission.expires) {
      const newPermission = await requestCameraPermission();
      if (!newPermission.granted) {
        Alert.alert(
          "Permission Denied",
          "Camera access is required to take pictures, change in your phones settings",
        );
        return;
      }
    }

    if (!mediaPermission?.granted || mediaPermission.expires) {
      const newPermission = await requestMediaPermission();
      if (!newPermission.granted) {
        Alert.alert(
          "Permission Denied",
          "Photo library access is required to pick images,  change in your phones settings",
        );
        return;
      }
    }
    const imageData = await pickImage();
    setImage(imageData ?? null);
  };

  const handleAddUser = () => {
    setIsFormDisplayed(true);
  };

  const onSubmit = handleSubmit(handleFormASubmission);

  return (
    <StaffFormsContext.Provider
      value={{
        image,
        handleImage,
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
    </StaffFormsContext.Provider>
  );
};

export default StaffFormsProvider;

export const useStaffForms = () => {
  const context = useContext(StaffFormsContext);
  if (!context) {
    throw new Error("useStaffForms must be used within a StaffFormsProvider");
  }
  return context;
};
