import DoughnutChart from "@/components/doughnutPieChart";
import OnpressMessage from "@/components/onPressMessage";
import { COLORS } from "@/utils/colors";
import React from "react";
import useChartHooks from "../hooks/chart.hooks";

const FinancialChart = () => {
  const {
    incomePercentage,
    expensePercentage,
    showMessage,
    onClose,
    isMessageShown,
    position,
    message,
  } = useChartHooks();

  return (
    <>
      <DoughnutChart
        data={[
          { item: "Sales Profit", value: incomePercentage, color: "#39CEF3" },
          {
            item: "Expenses",
            value: expensePercentage,
            color: COLORS.softCoral700,
          },
        ]}
        onPress={showMessage}
      />
      <OnpressMessage
        visible={isMessageShown}
        onClose={onClose}
        position={position}
        text={message}
      />
    </>
  );
};

export default FinancialChart;
