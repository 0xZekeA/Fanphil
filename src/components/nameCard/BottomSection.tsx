import { formatDate } from "@/utils/formatDate";
import React from "react";
import { Text, View } from "react-native";
import styles from "./styles/styles";

const BottomSection = ({ user }: { user: User }) => {
  const date = formatDate(user.created_at);

  return (
    <View className="justify-between flex-row ">
      <Text style={styles.textDets} className=" font-JakartaLight ">
        {user?.role}
      </Text>
      <Text style={styles.textDets} className=" font-JakartaLight ">
        {user.is_active !== 1 ? "Suspended" : `Joined ${date}`}
      </Text>
    </View>
  );
};

export default BottomSection;
