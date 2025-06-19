import { images } from "$root/constants/assets";
import useGetUsersPfp from "@/hooks/getUsersPfp.hooks";
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

  const pfp = useGetUsersPfp(user);

  return (
    <View style={styles.img}>
      {isUrl || (pfp && user.is_active === 1) ? (
        <Image source={pfp ? { uri: pfp } : images.pfp} style={styles.img} />
      ) : (
        <AdvancedImage cldImg={advancedImage} style={styles.img} />
      )}
    </View>
  );
};

export default Pfp;
