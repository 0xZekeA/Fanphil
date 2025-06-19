import * as FileSystem from "expo-file-system";

const PROFILE_PIC_DIR = FileSystem.documentDirectory + "profile_pics/";

// Check if directory exists
async function ensureDirExists() {
  const dirInfo = await FileSystem.getInfoAsync(PROFILE_PIC_DIR);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(PROFILE_PIC_DIR, {
      intermediates: true,
    });
  }
}

const cloudinaryUrl = (pubId: string | undefined) => {
  const cloudName = process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME;
  return `https://res.cloudinary.com/${cloudName}/image/upload/w_700,h_700,c_thumb,g_face/${pubId}`;
};

export async function getPfp(
  userId: string,
  imageUrl: string,
): Promise<string> {
  await ensureDirExists();

  const fileUri = PROFILE_PIC_DIR + userId + ".jpg";

  let url = imageUrl;

  if (!imageUrl.startsWith("https")) url = cloudinaryUrl(imageUrl);

  // Check if file exists
  const fileInfo = await FileSystem.getInfoAsync(fileUri);
  if (fileInfo.exists) {
    return fileUri;
  }

  // Download and store
  try {
    const { uri } = await FileSystem.downloadAsync(url, fileUri);
    return uri;
  } catch (error) {
    console.error("Failed to download profile pic:", error);
    return url;
  }
}
