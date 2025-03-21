import React from "react";
import { TouchableOpacity } from "react-native";
import { useMenuProvider } from "../../providers/MenuProvider";
import { useSalesDataProvider } from "../../providers/SalesDataProvider";
import styles from "../../styles/styles";
import BottomSection from "./BottomSection";
import Date from "./Date";
import TopSection from "./TopSection";

const ListItem = ({ item, index }: { item: Sale; index: number }) => {
  const { onPress, isNewDate } = useSalesDataProvider();
  const isNewDateItem = isNewDate(index, item);
  const { onOpenItemsMenu } = useMenuProvider();

  return (
    <>
      {isNewDateItem && <Date item={item} />}
      <TouchableOpacity
        style={styles.salesListItem}
        onPress={() => onPress(item)}
        onLongPress={(event: any) => onOpenItemsMenu(event, item)}
      >
        <TopSection item={item} />
        <BottomSection item={item} />
      </TouchableOpacity>
    </>
  );
};

export default ListItem;
