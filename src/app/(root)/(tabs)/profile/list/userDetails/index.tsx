import { DetsInfoTypes } from "@/types/profile";
import { Scale } from "@/utils/scaling";
import React from "react";
import { Text, View } from "react-native";
import styles from "../../styles/styles";

const UserDetails = ({ item }: { item: DetsInfoTypes }) => {
  const isRatings = item.category === "Ratings";

  return (
    <View
      style={{
        marginBottom: Scale.moderate(24),
        paddingHorizontal: isRatings ? 0 : Scale.moderate(8),
      }}
    >
      <View
        style={{ rowGap: Scale.moderate(12) }}
        className={`${
          isRatings
            ? "items-center justify-center"
            : "flex-row justify-between items-center"
        }`}
      >
        <Text
          style={[
            styles.textCategoryHeader,
            {
              paddingLeft: isRatings ? 0 : Scale.moderate(24),
            },
          ]}
          className="font-JakartaMedium"
        >
          {item.category}
        </Text>

        <Text
          style={[
            styles.textSmall,
            { paddingRight: isRatings ? 0 : Scale.moderate(24) },
          ]}
          className="font-JakartaMedium"
        >
          {item.item}
        </Text>
      </View>
    </View>
  );
};

export default UserDetails;
