import { cld } from "$root/services/cloudinary";
import { showToast } from "@/utils/notification";
import { upload } from "cloudinary-react-native";
import { UploadApiResponse } from "cloudinary-react-native/lib/typescript/src/api/upload/model/params/upload-params";
import * as ImagePicker from "expo-image-picker";
import { ActionSheetIOS, Platform } from "react-native";
import ActionSheet from "react-native-action-sheet";

export const uploadImage = async (uri: string): Promise<string | null> => {
  if (!uri) {
    console.warn("uploadImage: No URI provided");
    return null;
  }

  try {
    const response: UploadApiResponse | undefined = await new Promise<any>(
      (resolve, reject) => {
        upload(cld, {
          file: uri,
          options: {
            upload_preset: "default",
            unsigned: true,
          },
          callback: (error: any, result: UploadApiResponse | undefined) => {
            if (error) {
              reject(error);
            } else resolve(result);
          },
        });
      },
    );
    if (!response || !response.public_id) {
      throw new Error("Invalid Cloudinary response");
    }

    return response.public_id;
  } catch (error: any) {
    console.error("Upload error:", error);
    showToast(
      "error",
      "Image upload failed",
      `Error message: ${error.message}`,
    );
    return null;
  }
};

export const pickImage = async (): Promise<string | null> => {
  return new Promise((resolve) => {
    const options = ["Take Photo", "Choose from Gallery", "Cancel"];

    if (Platform.OS === "ios") {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options,
          cancelButtonIndex: 2,
        },
        (buttonIndex) => handleAction(buttonIndex, resolve),
      );
    } else {
      ActionSheet.showActionSheetWithOptions(
        {
          options,
          cancelButtonIndex: 2,
        },
        (buttonIndex) => handleAction(buttonIndex, resolve),
      );
    }
  });
};

const handleAction = async (
  buttonIndex: number,
  resolve: (value: string | null) => void,
) => {
  try {
    if (buttonIndex === 0) {
      const pickerResult = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });
      return resolve(
        pickerResult.canceled ? null : pickerResult.assets?.[0]?.uri,
      );
    }

    if (buttonIndex === 1) {
      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });
      return resolve(
        pickerResult.canceled ? null : pickerResult.assets?.[0]?.uri,
      );
    }

    return resolve(null);
  } catch (error) {
    console.error("Error picking image:", error);
    return resolve(null);
  }
};
