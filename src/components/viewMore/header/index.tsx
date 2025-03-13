import React from "react";
import { Text, View } from "react-native";
import styles from "../styles";
import Pfp from "./Pfp";

const Header = ({ item }: { item: any }) => {
  const isStaff = item?.full_name ?? false;

  return (
    <View style={styles.header} className="items-center">
      <Text style={styles.headerText} className="font-JakartaSemiBold">
        {isStaff
          ? item?.role +
            " " +
            item?.full_name.split(" ")[0] +
            " " +
            item?.full_name.split(" ")[1]
          : item.name || item.code}
      </Text>
      {isStaff && <Pfp user={item} />}
    </View>
  );
};

export default Header;
