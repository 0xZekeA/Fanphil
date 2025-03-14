import ListEmptyComp from "@/components/ListEmptyComp";
import { Scale } from "@/utils/scaling";
import React from "react";
import { FlatList, View } from "react-native";
import FinancesData from "../flatlistItem/ListItem";
import useFinancialHooks from "../hooks/finance.hooks";
import AddExpenseButton from "./AddExpenseButton";
import ExpandList from "./ExpandList";
import Header from "./Header";

const BreakdownList = () => {
  const { breakDown, isExpanded, setIsExpanded } = useFinancialHooks();

  return (
    <View className="mt-12">
      <FlatList
        data={breakDown}
        renderItem={({ item }) => <FinancesData item={item} />}
        keyExtractor={(_, index) => `general-${index}`}
        ListHeaderComponent={<Header />}
        ListEmptyComponent={<ListEmptyComp message="No recent expenses" />}
        ListFooterComponent={
          <View style={{ marginBottom: Scale.moderate(80) }}>
            <ExpandList setIsExpanded={setIsExpanded} isExpanded={isExpanded} />
            <AddExpenseButton />
          </View>
        }
      />
    </View>
  );
};

export default BreakdownList;
