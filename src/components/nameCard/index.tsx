import { Scale } from "@/utils/scaling";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import Details from "./Details";
import Pfp from "./Pfp";
import styles from "./styles/styles";

const NameCard = ({
  user,
  onPress,
  onLongPress,
}: {
  user: User;
  onPress: (staff: User) => void;
  onLongPress?: (staff: User, e: any) => void;
}) => {
  return (
    user && (
      <TouchableOpacity
        onPress={() => onPress(user)}
        onLongPress={(event) => (onLongPress ? onLongPress(user, event) : null)}
        style={styles.container}
        className="flex-1"
      >
        <View
          style={{ width: "100%", columnGap: Scale.moderate(16) }}
          className="flex-row items-center"
        >
          <Pfp user={user} />
          <Details user={user} />
        </View>
      </TouchableOpacity>
    )
  );
};

export default NameCard;
