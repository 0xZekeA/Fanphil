import CustomButton from "@/components/customButton";
import { Scale } from "@/utils/scaling";
import React from "react";
import { View } from "react-native";
import { usePurchasesFormProvider } from "../providers/PurchasesFormProvider";

const SubmitBtn = () => {
  const { submitPurchase, selectedItems } = usePurchasesFormProvider();
  return (
    selectedItems.size > 0 && (
      <View className="items-center" style={{ marginTop: Scale.moderate(80) }}>
        <CustomButton
          styling={{ width: "60%" }}
          title="Purchase items"
          onPress={submitPurchase}
        />
      </View>
    )
  );
};

export default SubmitBtn;
