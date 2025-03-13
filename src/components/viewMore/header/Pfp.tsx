import { images } from "$root/constants/assets";
import usePfp from "@/hooks/pfp.hooks";
import { AdvancedImage } from "cloudinary-react-native";
import React from "react";
import { Image, View } from "react-native";
import styles from "../styles";

const Pfp = ({ user }: { user: User }) => {
  const { filteredImage, urlOrPubID } = usePfp();

  const image = urlOrPubID(user);
  const isUrl = image?.startsWith("https");
  const advancedImage = filteredImage(user);

  return (
    <View style={styles.pfpContainer}>
      {isUrl ? (
        <Image source={images.pfp} style={styles.pfp} />
      ) : (
        <AdvancedImage cldImg={advancedImage} style={styles.pfp} />
      )}
    </View>
  );
};

export default Pfp;
