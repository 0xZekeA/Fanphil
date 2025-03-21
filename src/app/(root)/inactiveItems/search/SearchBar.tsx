import { icons } from "$root/constants/assets";
import Field from "@/components/inputField/Field";
import React from "react";
import { View } from "react-native";
import { useInactiveHooksProvider } from "../providers/InactiveHooksProvider";
import styles from "../styles/styles";

const SearchBar = () => {
  const { search, setSearch, inactiveItems } = useInactiveHooksProvider();

  return (
    (inactiveItems || []).length > 8 && (
      <View style={styles.searchBar}>
        <Field
          placeholder="Search anything"
          icon={icons.search}
          value={search}
          onChangeText={(value: string) => setSearch(value)}
        />
      </View>
    )
  );
};

export default SearchBar;
