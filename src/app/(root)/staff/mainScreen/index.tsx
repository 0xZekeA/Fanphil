import ContextMenu from "@/components/ContextMenu";
import ListEmptyComp from "@/components/ListEmptyComp";
import NameCard from "@/components/nameCard";
import React from "react";
import { FlatList, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "../header/Header";
import ModalForm from "../modals";
import { useMenuOptions } from "../providers/MenuOptionsProvider";
import { useStaffProviders } from "../providers/StaffProviders";
import styles from "../styles/styles";

const MainScreen = () => {
  const insets = useSafeAreaInsets();
  const { filteredUsers, handleOnPress } = useStaffProviders();
  const { handleLongPress, contextMenu, menuItems, setContextMenu } =
    useMenuOptions();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <FlatList
        data={filteredUsers}
        renderItem={({ item }) => (
          <NameCard
            user={item}
            onPress={handleOnPress}
            onLongPress={handleLongPress}
          />
        )}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={<Header />}
        ListEmptyComponent={
          <ListEmptyComp message="You can try adding a user" />
        }
        ListFooterComponent={<View style={{ paddingBottom: 80 }} />}
      />
      <ContextMenu
        visible={contextMenu.visible}
        position={contextMenu.position}
        items={menuItems}
        onClose={() =>
          setContextMenu((prev: any) => ({
            ...prev,
            visible: false,
          }))
        }
      />
      <ModalForm />
    </View>
  );
};

export default MainScreen;
