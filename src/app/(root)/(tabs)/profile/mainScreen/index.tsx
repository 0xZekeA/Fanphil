import OnpressMessage from "@/components/onPressMessage";
import { Scale } from "@/utils/scaling";
import React from "react";
import { FlatList, SafeAreaView, View } from "react-native";
import { useProfileScreenContext } from "../hooks/ProfileScreenProvider";
import useRefreshHook from "../hooks/refresh.hooks";
import Settings from "../list/settings";
import UserDetails from "../list/userDetails";
import styles from "../styles/styles";
import DetailsSection from "../topSection";
import ProfileBackButton from "../topSection/ProfileBackButton";

const MainScreen = () => {
  const {
    isMessageShown,
    onClose,
    position,
    message,
    data,
    isUserDetailsShown,
  } = useProfileScreenContext();
  const { refreshing, onRefresh } = useRefreshHook();

  return (
    <SafeAreaView style={styles.container}>
      <ProfileBackButton />

      <FlatList
        data={data}
        renderItem={({ item }) => {
          return isUserDetailsShown ? (
            <UserDetails item={item} />
          ) : (
            <Settings item={item} />
          );
        }}
        refreshing={refreshing}
        onRefresh={onRefresh}
        ListHeaderComponent={<DetailsSection />}
        ListFooterComponent={
          <View style={{ marginBottom: Scale.moderate(80) }} />
        }
      />
      <OnpressMessage
        visible={isMessageShown}
        onClose={onClose}
        position={position}
        text={message}
        width={Scale.moderate(120)}
      />
    </SafeAreaView>
  );
};

export default MainScreen;
