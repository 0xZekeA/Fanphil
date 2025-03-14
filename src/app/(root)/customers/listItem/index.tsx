import { Scale } from "@/utils/scaling";
import React from "react";
import { Text, View } from "react-native";
import { useCustomersProvider } from "../hooks/CustomersProvider";
import styles from "../styles/styles";

const ListItem = ({ item }: { item: Customer }) => {
  const { getSyncedIndicatorColor } = useCustomersProvider();
  const bgColor = getSyncedIndicatorColor(item);

  return (
    <View
      style={{
        paddingLeft: Scale.moderate(32),
        paddingRight: Scale.moderate(16),
        marginTop: Scale.moderate(32),
      }}
      className="flex-row items-center justify-between"
    >
      <Text style={styles.textMed} className="font-JakartaMedium">
        {item.name}
      </Text>
      <View
        style={[
          styles.syncedIndicator,
          {
            backgroundColor: bgColor,
          },
        ]}
      />
    </View>
  );
};

export default ListItem;
