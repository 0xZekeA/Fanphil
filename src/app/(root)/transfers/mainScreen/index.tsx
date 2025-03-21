import ContextMenu from "@/components/ContextMenu";
import ListEmptyComp from "@/components/ListEmptyComp";
import { Scale } from "@/utils/scaling";
import React from "react";
import { FlatList, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BottomSheet from "../inventoryBottomSheet";
import { useMenuProvider } from "../providers/MenuProvider";
import { useTransferFormProvider } from "../providers/TransferFormProvider";
import styles from "../styles/styles";
import Header from "../transferList/Header";
import ListItemMain from "../transferList/listItem";
import SubmitBtn from "../transferList/SubmitBtn";
import TopSection from "../transferList/TopSection";

const MainScreen = () => {
  const { menuItems, setContextMenu, contextMenu } = useMenuProvider();
  const insets = useSafeAreaInsets();

  const { selectedInventoryItems, isSheetOpen } = useTransferFormProvider();

  return (
    <GestureHandlerRootView
      style={[styles.container, { paddingTop: insets.top }]}
    >
      <TopSection />
      <View
        className="flex-1"
        style={{ paddingHorizontal: Scale.moderate(16) }}
      >
        <FlatList
          data={selectedInventoryItems}
          renderItem={({ item }) => <ListItemMain item={item} />}
          keyExtractor={(_, index) => index.toString()}
          ListEmptyComponent={
            <ListEmptyComp message="Select an item with the chevron button above" />
          }
          ListHeaderComponent={<Header />}
          ListFooterComponent={<SubmitBtn />}
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
      </View>
      {isSheetOpen && <BottomSheet />}
    </GestureHandlerRootView>
  );
};

export default MainScreen;
