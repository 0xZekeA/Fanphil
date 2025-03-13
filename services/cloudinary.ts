import env from "$root/config/env";
import { Cloudinary } from "@cloudinary/url-gen";

export const cld = new Cloudinary({
  cloud: {
    cloudName: env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME,
  },
});
