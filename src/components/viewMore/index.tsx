import filterData from "@/app/(root)/staff/constants/filterData";
import { useAuthProvider } from "@/providers/auth";
import { capitalizeItem } from "@/utils/capitalize";
import React from "react";
import { FlatList, Pressable } from "react-native";
import CustomButton from "../customButton";
import ListEmptyComp from "../ListEmptyComp";
import Header from "./header";
import RowComponent from "./listComponent";
import styles from "./styles";

const ViewMore = ({
  data,
  onClose,
  isDisplayed,
}: {
  data: any;
  onClose: () => void;
  isDisplayed: boolean;
}) => {
  const { isAdmin } = useAuthProvider();
  const userData = filterData(isAdmin, data);

  const displayedData = Object.entries(userData);
  if (!isDisplayed) return;

  return (
    data && (
      <Pressable style={styles.container}>
        <FlatList
          data={displayedData}
          keyExtractor={(item, index) => index.toString()}
          scrollEnabled={true}
          renderItem={({ item }) => {
            const [key, value] = item;
            return (
              <RowComponent
                initial={capitalizeItem(key)
                  .replace("_", " ")
                  .replace("_", " ")}
                later={value?.toString()}
              />
            );
          }}
          ListEmptyComponent={<ListEmptyComp message="No item exists" />}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={<Header item={data} />}
        />
        <CustomButton title="Close" onPress={onClose} />
      </Pressable>
    )
  );
};

export default ViewMore;
