import { images } from "$root/constants/assets";
import React from "react";
import { Image } from "react-native";
import styles from "../../../styles/styles";

const MailImg = () => {
  return <Image source={images.mail} style={styles.mailImg} />;
};

export default MailImg;
