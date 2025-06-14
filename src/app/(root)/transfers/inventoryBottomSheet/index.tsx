import CustomBottomSheet from "@/components/CustomBottomSheet";
import { Scale } from "@/utils/scaling";
import React from "react";
import { View } from "react-native";
import { useTransferFormProvider } from "../providers/TransferFormProvider";
import List from "./List";

const BottomSheet = () => {
  const { closeSheet, bottomSheetRef, handleSheetChange } =
    useTransferFormProvider();

  return (
    <CustomBottomSheet
      ref={bottomSheetRef}
      snapPoints={["40%", "80%"]}
      onClose={closeSheet}
      onChange={handleSheetChange}
    >
      <View style={{ rowGap: Scale.moderate(8), zIndex: 89 }}>
        <List />
      </View>
    </CustomBottomSheet>
  );
};

export default BottomSheet;
