import { images } from "$root/constants/assets";
import { AdvancedImage } from "cloudinary-react-native";
import React from "react";
import { Image, View } from "react-native";
import usePfp from "./hooks/userPfp.hooks";
import styles from "./styles/styles";

const Pfp = ({ user }: { user: User }) => {
  const { filteredImage, urlOrPubID } = usePfp();

  const image = urlOrPubID(user);
  const isUrl = image?.startsWith("https");
  const advancedImage = filteredImage(user);

  return (
    <View style={styles.img}>
      {isUrl ? (
        <Image
          source={image ? { uri: image } : images.pfp}
          style={styles.img}
        />
      ) : (
        <AdvancedImage cldImg={advancedImage} style={styles.img} />
      )}
    </View>
  );
};

export default Pfp;
