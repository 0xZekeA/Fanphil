import ContextMenu from "@/components/ContextMenu";
import ListEmptyComp from "@/components/ListEmptyComp";
import { Scale } from "@/utils/scaling";
import React from "react";
import { FlatList, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useMenuProvider } from "../hooks/MenuProvider";
import { useSalesDataProvider } from "../hooks/SalesDataProvider";
import { useSellItemFormProvider } from "../hooks/SellItemFormProvider";
import BottomSheet from "../inventoryBottomSheet";
import SalesInfo from "../mainSalesItems/SalesInfo";
import ShowAll from "../mainSalesItems/ShowAll";
import ListItem from "../mainSalesItems/listItem";
import ModalForm from "../modals";
import Header from "../pageHeader/Header";
import SubmitArea from "../sellItemList/SubmitArea";
import ListItemMain from "../sellItemList/listItem";
import styles from "../styles/styles";

const MainScreen = () => {
  const insets = useSafeAreaInsets();
  const { menuItems, setContextMenu, contextMenu, isSalesInterface } =
    useMenuProvider();
  const { selectedInventoryItems, isSheetOpen } = useSellItemFormProvider();
  const { salesData } = useSalesDataProvider();

  const data: any[] = isSalesInterface ? selectedInventoryItems : salesData;
  return (
    <GestureHandlerRootView
      style={[styles.container, { paddingTop: insets.top }]}
    >
      <View
        className="flex-1"
        style={{ paddingHorizontal: Scale.moderate(16) }}
      >
        <FlatList
          data={data}
          renderItem={({ item }) =>
            isSalesInterface ? (
              <ListItemMain item={item} />
            ) : (
              <ListItem item={item} />
            )
          }
          keyExtractor={(_, index) => index.toString()}
          ListEmptyComponent={
            <ListEmptyComp
              message={
                isSalesInterface
                  ? "Select an item with the chevron button above"
                  : "There is no recent sales data"
              }
            />
          }
          ListHeaderComponent={
            <View style={{ rowGap: Scale.moderate(16) }}>
              <Header />
              {!isSalesInterface && <SalesInfo />}
            </View>
          }
          ListFooterComponent={isSalesInterface ? <SubmitArea /> : <ShowAll />}
        />
      </View>
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
      {isSheetOpen && isSalesInterface && <BottomSheet />}
      <ModalForm />
    </GestureHandlerRootView>
  );
};

export default MainScreen;
