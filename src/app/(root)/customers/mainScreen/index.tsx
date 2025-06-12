import ListEmptyComp from "@/components/ListEmptyComp";
import React from "react";
import { FlatList, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "../header";
import ListItem from "../listItem";
import ModalForm from "../modals";
import { useCustomersProvider } from "../providers/CustomersProvider";
import styles from "../styles/styles";

const MainScreen = () => {
  const insets = useSafeAreaInsets();
  const { customers } = useCustomersProvider();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <FlatList
        data={customers}
        renderItem={({ item }) => <ListItem item={item} />}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={<Header />}
        ListEmptyComponent={<ListEmptyComp message="Add a customer" />}
      />
      <ModalForm />
    </View>
  );
};

export default MainScreen;
