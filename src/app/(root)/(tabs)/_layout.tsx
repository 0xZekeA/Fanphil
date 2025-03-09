import CustomTabBar from "@/src/components/CustomTabBar";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { StatusBar } from "react-native";
import Toast from "react-native-toast-message";
import Home from "./home";
import Inventory from "./inventory";
import Profile from "./profile";
import Sales from "./sales";

const AdminTabsLayout = () => {
  const Tab = createMaterialTopTabNavigator();

  return (
    <>
      <StatusBar
        translucent
        backgroundColor={"transparent"}
        barStyle={"dark-content"}
      />
      <Tab.Navigator
        tabBarPosition="bottom"
        initialRouteName="Home"
        tabBar={(props) => <CustomTabBar {...props} />}
        screenOptions={{
          tabBarShowIcon: true,
        }}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Inventory" component={Inventory} />
        <Tab.Screen name="Sales" component={Sales} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
      <Toast />
    </>
  );
};

export default AdminTabsLayout;
