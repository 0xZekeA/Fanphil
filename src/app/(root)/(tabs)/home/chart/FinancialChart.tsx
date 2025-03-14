import DoughnutChart from "@/components/doughnutPieChart";
import { useAuthProvider } from "@/providers/auth";
import { COLORS } from "@/utils/colors";
import { Scale } from "@/utils/scaling";
import React from "react";
import { ActivityIndicator, View } from "react-native";
import useFinancesHooks from "../hooks/finances.hooks";

const FinancialChart = () => {
  const { user } = useAuthProvider();

  const { incomePercentage, expensePercentage } = useFinancesHooks();

  const isAdmin = user?.role === "Creator" || user?.role === "Owner";

  if (isNaN(incomePercentage) || isNaN(expensePercentage)) {
    return <ActivityIndicator size="small" color={COLORS.black} />;
  }

  return (
    <>
      {isAdmin ? (
        <DoughnutChart
          data={[
            { item: "Sales", value: incomePercentage, color: "#39CEF3" },
            {
              item: "Expenses",
              value: expensePercentage,
              color: COLORS.softCoral700,
            },
          ]}
          onPress={() => {}}
        />
      ) : (
        <View style={{ marginTop: Scale.moderate(24) }} />
      )}
    </>
  );
};

export default FinancialChart;
