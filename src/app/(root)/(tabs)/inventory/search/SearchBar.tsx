import { icons } from "$root/constants/assets";
import Field from "@/components/inputField/Field";
import React from "react";
import { View } from "react-native";
import { useInventorySearchProvider } from "../hooks/InventorySearchProvider";
import styles from "../styles/styles";

const SearchBar = () => {
  const { search, setSearch, activateSearch } = useInventorySearchProvider();

  return (
    <View style={styles.searchBar}>
      <Field
        placeholder="Search anything"
        icon={icons.search}
        value={search}
        onChangeText={(value: string) => setSearch(value)}
        onFocus={activateSearch}
      />
    </View>
  );
};

export default SearchBar;
