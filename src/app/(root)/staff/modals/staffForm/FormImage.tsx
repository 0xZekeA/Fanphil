import { images } from "$root/constants/assets";
import { COLORS } from "@/utils/colors";
import { Scale } from "@/utils/scaling";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useStaffForms } from "../../providers/StaffFormProvider";
import styles from "../../styles/styles";

const FormImage = () => {
  const { handleImage, image } = useStaffForms();
  return (
    <View style={{ rowGap: Scale.moderate(8) }} className="items-center">
      <TouchableOpacity onPress={handleImage}>
        <View style={{ borderRadius: 360 }}>
          <Image
            source={image ? { uri: image } : images.pfp}
            style={styles.addImg}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleImage}>
        <Text style={[styles.textBase, { color: COLORS.indigo900 }]}>Add</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FormImage;
