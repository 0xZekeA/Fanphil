import { icons } from "$root/constants/assets";
import { useSellerDetsProvider } from "@/providers/seller/SellerDetsProvider";
import { Scale } from "@/utils/scaling";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useMenuProvider } from "../hooks/MenuProvider";
import { useTransferFormProvider } from "../hooks/TransferFormProvider";
import styles from "../styles/styles";

const Receiver = () => {
  const { selectedDriver } = useTransferFormProvider();
  const { onOpen } = useMenuProvider();
  const { sellers } = useSellerDetsProvider();

  const name = selectedDriver
    ? (selectedDriver.full_name || "").split(" ")[0]
    : "No drivers found";
  return (
    <View
      style={{ marginBottom: Scale.moderate(16) }}
      className="flex-row justify-between items-center"
    >
      <Text style={styles.textMed} className="font-JakartaSemiBold">
        Receiver:
      </Text>
      <View style={{ columnGap: Scale.moderate(12) }} className="flex-row">
        <Text style={styles.textMed} className="font-JakartaMedium">
          {name}
        </Text>
        {!((sellers || []).length < 2) && (
          <TouchableOpacity onPress={onOpen}>
            <Image source={icons.edit} style={styles.icons} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Receiver;
