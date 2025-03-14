import { Dispatch, SetStateAction } from "react";

const getMenuItems = (
  drivers: User[],
  setSelectedDriver: Dispatch<SetStateAction<User>>,
) => {
  if (!drivers)
    return [
      {
        name: "Add a driver",
        onPress: () => () => {},
      },
    ];

  const menuItems = drivers.map((driver) => ({
    name: driver.full_name,
    onPress: () => setSelectedDriver(driver),
  }));

  return menuItems;
};

export default getMenuItems;
