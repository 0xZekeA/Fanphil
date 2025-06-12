import ListEmptyComp from "@/components/ListEmptyComp";
import { Scale } from "@/utils/scaling";
import React from "react";
import { FlatList, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BottomSheet from "../inventoryBottomSheet";
import { usePurchasesFormProvider } from "../providers/PurchasesFormProvider";
import Header from "../purchaseList/Header";
import ListItemMain from "../purchaseList/listItem";
import SubmitBtn from "../purchaseList/SubmitBtn";
import TopSection from "../purchaseList/TopSection";
import styles from "../styles/styles";

const MainScreen = () => {
  const insets = useSafeAreaInsets();

  const { selectedInventoryItems, isSheetOpen } = usePurchasesFormProvider();

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
          keyExtractor={(item) => item.id}
          ListEmptyComponent={
            <ListEmptyComp message="Select an item with the chevron button above" />
          }
          ListHeaderComponent={<Header />}
          ListFooterComponent={<SubmitBtn />}
        />
      </View>
      {isSheetOpen && <BottomSheet />}
    </GestureHandlerRootView>
  );
};

export default MainScreen;
