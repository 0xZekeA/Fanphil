import { getDb } from "@/database/database";
import { eventBus } from "@/events/events";
import { showToast } from "@/utils/notification";
import { Dispatch, SetStateAction } from "react";
import { pickImage, uploadImage } from "./staff/imageUpload";

const TABLE_NAME = "users";

export const editImage = async (
  user: User,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setPubId: Dispatch<SetStateAction<string>>,
) => {
  if (!user) {
    showToast("error", "Check your internet connection and restart the app");
    return;
  }

  try {
    const imageData = await pickImage();
    if (!imageData) return;

    setLoading(true);

    const uploadResponse = await uploadImage(imageData!);
    if (!uploadResponse) {
      setLoading(false);
      showToast("error", "Failed to upload image");
      return;
    }

    setPubId(uploadResponse);

    const db = await getDb();
    const now = new Date().toISOString();

    await db.runAsync(
      "UPDATE users SET pfp = ?, updated_at = ?, synced_at = NULL WHERE id = ?",
      [uploadResponse, now, user.id],
    );

    showToast("success", "Profile image was changed successfully");
  } catch (error: any) {
    showToast(
      "error",
      "Failed to upload image",
      `Error details: ${error.message}`,
    );
  } finally {
    eventBus.emit(`refresh:${TABLE_NAME}}`);
    setLoading(false);
  }
};
