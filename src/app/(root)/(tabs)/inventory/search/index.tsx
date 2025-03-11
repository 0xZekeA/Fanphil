import React from "react";
import { Modal, TouchableWithoutFeedback } from "react-native";
import Animated from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useInventorySearchProvider } from "../hooks/InventorySearchProvider";
import CloseButton from "./CloseButton";
import SearchBar from "./SearchBar";
import SearchList from "./SearchList";

const SearchComponent = () => {
  const { searchBarStyle, searchActive, deactivateSearch } =
    useInventorySearchProvider();
  const insets = useSafeAreaInsets();

  return (
    <>
      {!searchActive ? (
        <Animated.View style={searchBarStyle} className="flex-row">
          <SearchBar />
        </Animated.View>
      ) : (
        <Modal
          visible={searchActive}
          transparent
          animationType="fade"
          onRequestClose={deactivateSearch}
        >
          <TouchableWithoutFeedback onPress={deactivateSearch}>
            <>
              <Animated.View
                style={[searchBarStyle, { marginTop: insets.top }]}
                className="bg-white p-4 flex-row rounded-b-2xl"
              >
                <SearchBar />
                <CloseButton />
              </Animated.View>
              <SearchList />
            </>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </>
  );
};

export default SearchComponent;
