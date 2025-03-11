import ListEmptyComp from "@/components/ListEmptyComp";
import { Scale } from "@/utils/scaling";
import React from "react";
import { FlatList, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ActionBtnArea from "../actionButtonsArea";
import FinancialChart from "../chart/FinancialChart";
import Greetings from "../greetings";
import useSalesInfoHooks from "../hooks/salesInfo.hooks";
import Header from "../salesList/Header";
import SalesItem from "../salesList/listItem";
import styles from "../styles/styles";

const MainScreen = () => {
  const insets = useSafeAreaInsets();

  const { sortedSales } = useSalesInfoHooks();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <FlatList
        data={sortedSales}
        renderItem={({ item }) => <SalesItem sale={item} />}
        ListHeaderComponent={
          <View style={{ rowGap: Scale.moderate(16) }}>
            <Greetings />
            <FinancialChart />
            <ActionBtnArea />
            <Header />
          </View>
        }
        ListEmptyComponent={<ListEmptyComp message="No recent sales" />}
        ListFooterComponent={<View style={{ paddingBottom: insets.top * 2 }} />}
      />
    </View>
  );
};

export default MainScreen;
