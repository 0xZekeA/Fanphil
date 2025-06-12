import BackButton from "@/components/BackButton";
import ContextMenu from "@/components/ContextMenu";
import ListEmptyComp from "@/components/ListEmptyComp";
import OnpressMessage from "@/components/onPressMessage";
import { Scale } from "@/utils/scaling";
import React from "react";
import { FlatList, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ListItem from "../listItem";
import ModalForm from "../modals";
import { useInactiveHooksProvider } from "../providers/InactiveHooksProvider";
import { usePopUpsProvider } from "../providers/PopUpsProvider";
import SearchBar from "../search/SearchBar";
import styles from "../styles/styles";

const MainScreen = () => {
  const insets = useSafeAreaInsets();
  const { filteredInactiveItems } = useInactiveHooksProvider();
  const {
    isMessageShown,
    onClose,
    position,
    message,
    contextMenu,
    menuItems,
    setContextMenu,
  } = usePopUpsProvider();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <FlatList
        data={filteredInactiveItems}
        renderItem={({ item }) => <ListItem item={item} />}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View
            style={{
              rowGap: Scale.moderate(12),
              marginBottom: Scale.moderate(16),
            }}
          >
            <BackButton title="Inactive Items" />
            <SearchBar />
          </View>
        }
        ListEmptyComponent={
          <ListEmptyComp message="There's currently no inactive item" />
        }
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
      <OnpressMessage
        visible={isMessageShown}
        onClose={onClose}
        position={position}
        text={message}
        width={Scale.moderate(120)}
      />
      <ModalForm />
    </View>
  );
};

export default MainScreen;
