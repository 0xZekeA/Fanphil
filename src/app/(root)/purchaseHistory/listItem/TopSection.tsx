import { useUsersProvider } from "@/providers/users/UsersProvider";
import { formatDate } from "@/utils/formatDate";
import { getUsersName } from "@/utils/getUsersName";
import React from "react";
import { Text, View } from "react-native";
import styles from "../styles/styles";

const TopSection = ({ item }: { item: Purchase }) => {
  const { users } = useUsersProvider();

  const creator = getUsersName(item.purchased_by || "", users);
  const date = formatDate(item.created_at);

  return (
    <View className="justify-between items-center flex-row">
      <Text style={styles.textMed} className="font-Jakarta">
        Purchased by - {creator}
      </Text>
      <Text style={styles.textSmall} className="font-JakartaLight">
        {date}
      </Text>
    </View>
  );
};

export default TopSection;
