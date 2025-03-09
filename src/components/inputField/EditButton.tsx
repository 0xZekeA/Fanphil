import { COLORS } from "@/utils/colors";
import React, { Dispatch, SetStateAction } from "react";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const EditButton = ({
  isEditing,
  setIsEditing,
}: {
  isEditing: boolean;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <TouchableOpacity
      onPress={() => setIsEditing(!isEditing)}
      style={{ flexBasis: "15%" }}
      className="justify-center, items-center"
    >
      <Icon
        name={isEditing ? "checkmark-outline" : "create-outline"}
        size={15}
        color={COLORS.gray600}
      />
    </TouchableOpacity>
  );
};

export default EditButton;
