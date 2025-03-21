import { icons } from "$root/constants/assets";
import { useUsersProvider } from "@/providers/users/UsersProvider";
import { Scale } from "@/utils/scaling";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useMenuProvider } from "../providers/MenuProvider";
import { useSellItemFormProvider } from "../providers/sellForm/SellItemFormProvider";
import styles from "../styles/styles";

const Customer = () => {
  const { selectedCustomer } = useSellItemFormProvider();
  const { onOpenMenuOptions } = useMenuProvider();
  const { sellers } = useUsersProvider();

  const name = selectedCustomer
    ? (selectedCustomer.name || "").split(" ")[0]
    : "No cutomer found";

  const isNotSingleOrNoSeller = !((sellers || []).length < 2);
  return (
    <View
      style={{ marginBottom: Scale.moderate(16) }}
      className="flex-row justify-between items-center"
    >
      <Text style={styles.textMed} className="font-JakartaSemiBold">
        Customer:
      </Text>
      <View className="flex-row">
        <Text
          style={[
            styles.textMed,
            { paddingRight: Scale.moderate(isNotSingleOrNoSeller ? 12 : 4) },
          ]}
          className="font-JakartaMedium"
        >
          {name}
        </Text>
        {isNotSingleOrNoSeller && (
          <TouchableOpacity onPress={onOpenMenuOptions}>
            <Image source={icons.edit} style={styles.icons} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Customer;
