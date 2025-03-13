import BackButton from "@/components/BackButton";
import { COLORS } from "@/utils/colors";
import { Scale } from "@/utils/scaling";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useStaffForms } from "../hooks/StaffFormProvider";
import styles from "../styles/styles";

const Header = () => {
  const { handleAddUser } = useStaffForms();
  return (
    <View
      style={{
        paddingRight: Scale.moderate(24),
        paddingBottom: Scale.moderate(24),
      }}
      className="flex-row justify-between items-center"
    >
      <BackButton title="Manage Staff" />
      <TouchableOpacity onPress={handleAddUser}>
        <Text style={[styles.textBase, { color: COLORS.blue800 }]}>Add</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Header;
