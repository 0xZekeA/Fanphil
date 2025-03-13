import { dialNumber, suspendOrReinstateAgent } from "@/utils/staff/manageStaff";
import { Dispatch, SetStateAction } from "react";

const getMenuItems = (
  item: User,
  isAdmin: boolean,
  setIsConfirmOption: Dispatch<SetStateAction<boolean>>,
  setIsLoading: Dispatch<SetStateAction<boolean>>,
  setAction: Dispatch<SetStateAction<Action | null>>,
) => {
  if (!item) return null;

  const isSuspended = item.is_active === 0;

  const createAction = (
    type: string,
    onPress: () => void,
    options: any = {},
  ) => ({
    type,
    item,
    setIsConfirmOption,
    onPress,
    ...options,
  });

  const menuItems = [
    {
      name: `Call ${item.full_name.split(" ")[0]}`,
      onPress: () => dialNumber(item.phone_number),
      hidden: false,
    },
  ];

  if (isAdmin) {
    menuItems.push(
      {
        name: "Suspend",
        onPress: () => {
          setAction(
            createAction(
              "suspend",
              () => suspendOrReinstateAgent(item, setIsLoading),
              {
                destructive: true,
              },
            ),
          );
          setIsConfirmOption(true);
        },
        hidden: isSuspended,
      },
      {
        name: "Reinstate",
        onPress: () => {
          setAction(
            createAction("reinstate", () =>
              suspendOrReinstateAgent(item, setIsLoading, true),
            ),
          );
          setIsConfirmOption(true);
        },
        hidden: !isSuspended,
      },
    );
  }

  return menuItems.filter((item) => !item.hidden);
};

export default getMenuItems;
