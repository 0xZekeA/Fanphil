import BackButton from "@/components/BackButton";
import ListEmptyComp from "@/components/ListEmptyComp";
import { Scale } from "@/utils/scaling";
import React from "react";
import { FlatList, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHistoryListProvider } from "../hooks/HistoryListProvider";
import ListItem from "../listItem";
import PurchasedItemsModal from "../modals";
import styles from "../styles/styles";

const MainScreen = () => {
  const insets = useSafeAreaInsets();
  const { data } = useHistoryListProvider();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <FlatList
        data={data}
        renderItem={({ item }) => <ListItem item={item} />}
        ListEmptyComponent={
          <ListEmptyComp message="There is no recent transfer or return" />
        }
        ListHeaderComponent={
          <View style={{ paddingBottom: Scale.moderate(32) }}>
            <BackButton title="Transfer History" />
          </View>
        }
      />
      <PurchasedItemsModal />
    </View>
  );
};

export default MainScreen;
