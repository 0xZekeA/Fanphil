import { images } from "$root/constants/assets";
import { AdvancedImage } from "cloudinary-react-native";
import React from "react";
import { Image, TouchableOpacity } from "react-native";
import { usePfpProvider } from "../../hooks/PfpProvider";
import styles from "../../styles/styles";

const Pfp = () => {
  const { image, setViewPfp, imagePubID } = usePfpProvider();

  return (
    <TouchableOpacity
      style={styles.pfpContainer}
      onPress={() => setViewPfp(true)}
    >
      {imagePubID.startsWith("https") ? (
        <Image source={images.pfp} style={styles.pfp} />
      ) : (
        <AdvancedImage cldImg={image} style={styles.pfp} />
      )}
    </TouchableOpacity>
  );
};

export default Pfp;
