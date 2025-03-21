import env from "$root/config/env";
import { cld } from "$root/services/cloudinary";
import { useAuthProvider } from "@/providers/auth";

import { PfpProviderContextTypes } from "@/types/profile";
import { editImage } from "@/utils/profile";
import { CloudinaryImage } from "@cloudinary/url-gen";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { FocusOn } from "@cloudinary/url-gen/qualifiers/focusOn";
import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
import { useCallback, useMemo, useState } from "react";

import { createContext, PropsWithChildren, useContext } from "react";

const PfpProviderContext = createContext<PfpProviderContextTypes | undefined>(
  undefined,
);

const PfpProvider = ({ children }: PropsWithChildren) => {
  const { user } = useAuthProvider();

  const [viewPfp, setViewPfp] = useState(false);

  const [pubId, setPubId] = useState(user?.pfp || "");
  const [loading, setLoading] = useState(false);

  const cloudinaryUrl = useMemo(() => {
    const cloudName = env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME;
    return `https://res.cloudinary.com/${cloudName}/image/upload/w_600/${pubId}`;
  }, [pubId]);

  const image: CloudinaryImage = cld.image(pubId);
  image.resize(
    thumbnail().width(300).height(300).gravity(focusOn(FocusOn.face())),
  );
  const imagePubID = pubId;

  const editPfp = useCallback(async () => {
    if (!user) return;
    editImage(user, setLoading, setPubId);
  }, [user]);

  return (
    <PfpProviderContext.Provider
      value={{
        image,
        viewPfp,
        setViewPfp,
        editPfp,
        imagePubID,
        loading,
        cloudinaryUrl,
      }}
    >
      {children}
    </PfpProviderContext.Provider>
  );
};
export default PfpProvider;

export const usePfpProvider = () => {
  const context = useContext(PfpProviderContext);
  if (!context) {
    throw new Error("usePfpProvider must be used within a PfpProviderProvider");
  }
  return context;
};
