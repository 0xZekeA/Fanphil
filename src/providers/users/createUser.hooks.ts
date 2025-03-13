import { supabase } from "$root/lib/supabase";
import { addUser } from "@/database/users";
import { showToast } from "@/utils/notification";
import { uploadImage } from "@/utils/staff/imageUpload";

const useCreateUserHooks = (user: User | null) => {
  const isAuthorized =
    user &&
    (user?.role === "Creator" ||
      user?.role === "Manager" ||
      user?.role === "Owner");

  const createAgent = async (
    { email, name, role, phoneNumber, address }: UserFormType,
    image: string | null,
  ): Promise<{ success?: boolean } | undefined> => {
    if (!isAuthorized) {
      showToast(
        "error",
        "Error while creating user",
        "Unauthorized: Only the Creator, Owners and Managers can create users",
      );
      return;
    }
    if (
      user?.role.includes("Manager") ||
      (user?.role.includes("Owner") && role === "Manager")
    ) {
      showToast(
        "error",
        "Error while creating user",
        "You cannot create a Manager or Owner role as a Manager",
      );
      return;
    }
    try {
      const { data, error } = await supabase.auth.admin.createUser({
        email: email,
        password: phoneNumber,
        user_metadata: { role: role, phone: phoneNumber },
      });

      if (error) throw error;

      const userId = data?.user.id;
      const uploadResponse = image ? await uploadImage(image) : null;

      const imagePubId =
        uploadResponse ||
        "https://res.cloudinary.com/deobwjsxy/image/upload/v1737286203/Pfp_wvijff.png";

      if (userId) {
        const { error: agentError } = await supabase.from("users").insert({
          id: userId,
          full_name: name,
          email: email,
          phone_number: phoneNumber,
          address: address,
          role: role,
          pfp: imagePubId || "Pfp_wvijff",
          created_by: user.id,
        });

        if (agentError) throw agentError;

        const id = await addUser(
          userId,
          name,
          email,
          phoneNumber,
          role,
          imagePubId,
          address,
          user.id,
        );

        if (!id) throw new Error("Fail to add user to local database");
        console.log("User and public data created successfully!");
        return { success: true };
      }
    } catch (error: any) {
      console.error("Unexpected error:", error);
      showToast("error", "Error while creating agent", `${error.message}`);
    }
  };

  return { createAgent };
};

export default useCreateUserHooks;
