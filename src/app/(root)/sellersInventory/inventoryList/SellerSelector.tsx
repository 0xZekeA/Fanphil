import { icons } from "$root/constants/assets";
import { useUsersProvider } from "@/providers/users/UsersProvider";
import { Scale } from "@/utils/scaling";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useMenuProvider } from "../hooks/MenuProvider";
import { useSellersInventoryListProvider } from "../hooks/SellersInventoryListProvider";
import styles from "../styles/styles";

const SellerSelector = () => {
  const { selectedSeller } = useSellersInventoryListProvider();
  const { onOpen } = useMenuProvider();
  const { sellers } = useUsersProvider();

  const name = selectedSeller
    ? (selectedSeller.full_name || "").split(" ")[0]
    : "No drivers found";

  const isNotSingleOrNoSeller = !((sellers || []).length < 2);

  return (
    <View
      style={{
        marginBottom: Scale.moderate(16),
        paddingHorizontal: Scale.moderate(16),
      }}
      className="flex-row justify-between items-center"
    >
      <Text style={styles.textLarge} className="font-JakartaSemiBold">
        Seller:
      </Text>
      <View className="flex-row">
        <Text
          style={[
            styles.textLarge,
            { paddingRight: Scale.moderate(isNotSingleOrNoSeller ? 12 : 4) },
          ]}
          className="font-JakartaMedium"
        >
          {name}
        </Text>
        {isNotSingleOrNoSeller && (
          <TouchableOpacity onPress={onOpen}>
            <Image source={icons.edit} style={styles.icons} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default SellerSelector;
