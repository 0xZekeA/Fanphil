import { images } from "$root/constants/assets";
import useGetUsersPfp from "@/hooks/getUsersPfp.hooks";
import { useAuthProvider } from "@/providers/auth";
import { AdvancedImage } from "cloudinary-react-native";
import React from "react";
import { Image, TouchableOpacity } from "react-native";
import { usePfpProvider } from "../../providers/PfpProvider";
import styles from "../../styles/styles";

const Pfp = () => {
  const { user } = useAuthProvider();
  const { image, setViewPfp, imagePubID } = usePfpProvider();
  const pfp = useGetUsersPfp(user);

  return (
    <TouchableOpacity
      style={styles.pfpContainer}
      onPress={() => setViewPfp(true)}
    >
      {imagePubID.startsWith("https") || (pfp && user?.is_active === 1) ? (
        <Image source={pfp ? { uri: pfp } : images.pfp} style={styles.pfp} />
      ) : (
        <AdvancedImage cldImg={image} style={styles.pfp} />
      )}
    </TouchableOpacity>
  );
};

export default Pfp;
