import BackButton from "@/components/BackButton";
import { COLORS } from "@/utils/colors";
import { Scale } from "@/utils/scaling";
import React from "react";
import { FlatList, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BreakdownList from "./breakdown/BreakdownList";
import FinancialChart from "./chart";
import ModalForm from "./expenseForm/ModalForm";
import FinancesData from "./flatlistItem/ListItem";
import useFinanceHooks from "./hooks/finance.hooks";
import useFinanceRefresh from "./hooks/refresh.hooks";
import ExpenseProviders from "./providers/ExpenseProviders";
import SalesInfo from "./salesInfo";

const Finances = () => {
  const { refresh, isRefreshing } = useFinanceRefresh();
  const { financialData } = useFinanceHooks();

  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        backgroundColor: COLORS.white,
        paddingTop: insets.top,
        paddingHorizontal: Scale.moderate(8),
      }}
      className="flex-1"
    >
      <FlatList
        data={financialData}
        renderItem={({ item }) => <FinancesData item={item} />}
        keyExtractor={(_, index) => `general-${index}`}
        refreshing={isRefreshing}
        onRefresh={refresh}
        ListHeaderComponent={
          <View
            style={{
              marginTop: Scale.moderate(16),
              marginBottom: Scale.moderate(24),
              rowGap: Scale.moderate(12),
            }}
          >
            <BackButton title="Finances" />
            <FinancialChart />
            <View style={{ paddingHorizontal: Scale.moderate(24) }}>
              <SalesInfo />
            </View>
          </View>
        }
        ListFooterComponent={
          <ExpenseProviders>
            <ModalForm />
            <BreakdownList />
          </ExpenseProviders>
        }
      />
    </View>
  );
};

export default Finances;
