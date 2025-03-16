import BackButton from "@/components/BackButton";
import { Scale } from "@/utils/scaling";
import React from "react";
import { Text, View } from "react-native";
import { useMenuProvider } from "../hooks/MenuProvider";
import { useSalesDataProvider } from "../hooks/SalesDataProvider";
import OptionsButton from "../options/OptionsButton";
import Customer from "../sellItemList/Customer";
import ItemsTitle from "../sellItemList/ItemsTitle";
import styles from "../styles/styles";

const Header = () => {
  const { isSalesInterface, setIsSalesInterface } = useMenuProvider();
  const { isOwingFiltered } = useSalesDataProvider();

  return isSalesInterface ? (
    <View style={{ rowGap: Scale.moderate(16) }}>
      <BackButton
        title="Sell Items"
        onPress={() => setIsSalesInterface(false)}
      />
      <View style={{ rowGap: Scale.moderate(8) }}>
        <Customer />
        <ItemsTitle />
      </View>
    </View>
  ) : (
    <View
      style={styles.pageHeader}
      className="items-center justify-between flex-row"
    >
      <Text style={styles.textXL} className="font-Jakarta">
        {isOwingFiltered ? "Credit Sales" : "Sales"}
      </Text>
      <OptionsButton />
    </View>
  );
};

export default Header;
