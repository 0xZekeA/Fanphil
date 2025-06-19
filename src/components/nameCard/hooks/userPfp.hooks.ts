import { cld } from "$root/services/cloudinary";
import { CloudinaryImage } from "@cloudinary/url-gen";
import { grayscale } from "@cloudinary/url-gen/actions/effect";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { FocusOn } from "@cloudinary/url-gen/qualifiers/focusOn";
import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
import { useCallback } from "react";

const usePfp = () => {
  const filteredImage = useCallback((user: User) => {
    const image: CloudinaryImage = cld.image(user?.pfp);
    return user.is_active === 0
      ? image
          .resize(
            thumbnail().width(50).height(50).gravity(focusOn(FocusOn.face())),
          )
          .effect(grayscale())
      : image.resize(
          thumbnail().width(50).height(50).gravity(focusOn(FocusOn.face())),
        );
  }, []);

  const urlOrPubID = useCallback((user: User) => user.pfp, []);

  return { filteredImage, urlOrPubID };
};

export default usePfp;
