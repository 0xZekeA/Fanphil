import ContextMenu from "@/components/ContextMenu";
import ListEmptyComp from "@/components/ListEmptyComp";
import { Scale } from "@/utils/scaling";
import React from "react";
import { FlatList, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ListItem from "../inventoryList/listItem";
import ShowAll from "../inventoryList/ShowAll";
import ModalForm from "../modals";
import Header from "../pageHeader/Header";
import { useInventoryListProvider } from "../providers/InventoryListProvider";
import { useMenuProvider } from "../providers/MenuProvider";
import SearchComponent from "../search";
import styles from "../styles/styles";

const MainScreen = () => {
  const insets = useSafeAreaInsets();
  const { inventoryData } = useInventoryListProvider();
  const { menuItems, setContextMenu, contextMenu } = useMenuProvider();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <FlatList
        data={inventoryData}
        renderItem={({ item }) => <ListItem item={item} />}
        ListHeaderComponent={
          <View style={{ marginBottom: Scale.moderate(24) }}>
            <Header />
            <SearchComponent />
          </View>
        }
        keyExtractor={(item) => item.id}
        ListFooterComponent={
          <View
            style={{
              paddingBottom: insets.bottom * 3,
              marginTop: Scale.moderate(20),
            }}
          >
            <ShowAll />
          </View>
        }
        ListEmptyComponent={
          <ListEmptyComp message="No inventory items could be found" />
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
      <ModalForm />
    </View>
  );
};

export default MainScreen;
