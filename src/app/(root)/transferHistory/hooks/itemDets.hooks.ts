import { useUsersProvider } from "@/providers/users/UsersProvider";
import { COLORS } from "@/utils/colors";
import { getUsersName } from "@/utils/getUsersName";
import { useCallback } from "react";

const useItemDetsHooks = () => {
  const { usersMap } = useUsersProvider();
  const isReturn = useCallback(
    (item: InventoryTransfer | Return): item is Return => {
      return (
        typeof item === "object" &&
        item !== null &&
        "seller" in item &&
        "item_id" in item &&
        "quantity" in item &&
        "returned_by" in item
      );
    },
    [],
  );

  const getTitle = useCallback(
    (item: InventoryTransfer | Return) =>
      isReturn(item) ? "Return" : "Transfer",
    [isReturn],
  );

  const getCreator = useCallback(
    (item: InventoryTransfer | Return) => {
      if (isReturn(item)) {
        return getUsersName(item.returned_by, usersMap);
      }
      return getUsersName(item.transferred_by, usersMap);
    },
    [isReturn, usersMap],
  );

  const getCreatee = useCallback(
    (item: InventoryTransfer | Return) => {
      if (isReturn(item)) {
        return getUsersName(item.seller, usersMap);
      }
      return getUsersName(item.received_by, usersMap);
    },
    [isReturn, usersMap],
  );

  const getColor = useCallback(
    (item: InventoryTransfer | Return) => {
      if (isReturn(item)) {
        return COLORS.softCoral700;
      }
      return COLORS.mint500;
    },
    [isReturn],
  );

  return { isReturn, getTitle, getCreator, getCreatee, getColor };
};

export default useItemDetsHooks;
