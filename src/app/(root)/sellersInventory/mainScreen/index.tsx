import ContextMenu from "@/components/ContextMenu";
import ListEmptyComp from "@/components/ListEmptyComp";
import React from "react";
import { FlatList, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "../inventoryList/Header";
import ListItem from "../inventoryList/listItem";
import ModalForm from "../modals";
import { useMenuProvider } from "../providers/MenuProvider";
import { useSellersInventoryListProvider } from "../providers/SellersInventoryListProvider";
import styles from "../styles/styles";

const MainScreen = () => {
  const insets = useSafeAreaInsets();
  const { menuItems, setContextMenu, contextMenu } = useMenuProvider();
  const { filteredSellersInventory } = useSellersInventoryListProvider();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <FlatList
        data={filteredSellersInventory}
        renderItem={({ item }) => <ListItem item={item} />}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <ListEmptyComp message="You add items to this seller from the Transfer screen" />
        }
        ListHeaderComponent={<Header />}
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
