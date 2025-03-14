import BackButton from "@/components/BackButton";
import { COLORS } from "@/utils/colors";
import { Scale } from "@/utils/scaling";
import React from "react";
import { FlatList, SafeAreaView, View } from "react-native";
import BreakdownList from "./breakdown/BreakdownList";
import FinancialChart from "./chart";
import ModalForm from "./expenseForm/ModalForm";
import FinancesData from "./flatlistItem/ListItem";
import ExpenseProviders from "./hooks/ExpenseProviders";
import useFinanceHooks from "./hooks/finance.hooks";
import useFinanceRefresh from "./hooks/refresh.hooks";

const Finances = () => {
  const { refresh, isRefreshing } = useFinanceRefresh();
  const { financialData } = useFinanceHooks();

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white }} className="flex-1">
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
          </View>
        }
        ListFooterComponent={
          <ExpenseProviders>
            <ModalForm />
            <BreakdownList />
          </ExpenseProviders>
        }
      />
    </SafeAreaView>
  );
};

export default Finances;
