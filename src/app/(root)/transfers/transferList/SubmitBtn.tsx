import CustomButton from "@/components/customButton";
import { Scale } from "@/utils/scaling";
import React from "react";
import { View } from "react-native";
import { useTransferFormProvider } from "../providers/TransferFormProvider";

const SubmitBtn = () => {
  const { submitTransfer, selectedItems } = useTransferFormProvider();
  return (
    (selectedItems || []).length > 0 && (
      <View className="items-center" style={{ marginTop: Scale.moderate(80) }}>
        <CustomButton
          styling={{ width: "60%" }}
          title="Submit"
          onPress={submitTransfer}
        />
      </View>
    )
  );
};

export default SubmitBtn;
