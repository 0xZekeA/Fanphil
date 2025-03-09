import { icons } from "$root/constants/assets";
import { COLORS } from "@/utils/colors";
import { Scale } from "@/utils/scaling";
import { MaterialTopTabNavigationEventMap } from "@react-navigation/material-top-tabs";
import { MaterialTopTabDescriptorMap } from "@react-navigation/material-top-tabs/lib/typescript/commonjs/src/types";
import {
  NavigationHelpers,
  ParamListBase,
  TabNavigationState,
} from "@react-navigation/native";
import { BlurView } from "expo-blur";
import {
  Image,
  Platform,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import Animated, { LinearTransition } from "react-native-reanimated";

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const getImage = (icon: any, isFocused: boolean) => {
  return (
    <Image
      style={{ width: Scale.moderate(24), height: Scale.moderate(20) }}
      source={icon}
      resizeMode="contain"
      tintColor={isFocused ? COLORS.white : COLORS.gray200}
    />
  );
};

const getIconByRoute = (routeName: string, isFocused: boolean) => {
  switch (routeName) {
    case "Home":
      return getImage(icons.home, isFocused);
    case "Profile":
      return getImage(icons.person, isFocused);
    case "Inventory":
      return getImage(icons.list, isFocused);
    case "Sales":
      return getImage(icons.trend, isFocused);
    default:
      return getImage(icons.home, isFocused);
  }
};

type TabBarProps = {
  state: TabNavigationState<ParamListBase>;
  navigation: NavigationHelpers<
    ParamListBase,
    MaterialTopTabNavigationEventMap
  >;
  descriptors: MaterialTopTabDescriptorMap;
};

const CustomTabBar = ({ state, descriptors, navigation }: TabBarProps) => {
  const { width } = useWindowDimensions();
  const tabBarWidth = width * 0.7;

  return (
    <>
      {Platform.OS === "ios" ? (
        <BlurView
          intensity={10}
          tint="light"
          style={{
            height: Scale.moderate(80),
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 5,
          }}
          className="absolute"
        />
      ) : (
        <View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: Scale.moderate(80),
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            borderRadius: Scale.moderate(24),
          }}
        />
      )}
      <View
        style={{
          width: tabBarWidth,
          padding: Scale.moderate(4),
          backgroundColor: COLORS.pastel700,
          bottom: Scale.moderate(40),
          borderRadius: 60,
          zIndex: 2000,
          shadowColor: COLORS.gray400,
          shadowOffset: { width: 5, height: 10 },
          shadowOpacity: 0.1,
          shadowRadius: 10,
          elevation: 15,
        }}
        className="flex-row items-center justify-between absolute self-center"
      >
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          return (
            <AnimatedTouchableOpacity
              layout={LinearTransition.springify().mass(0.5)}
              key={route.key}
              onPress={onPress}
              style={{
                height: 56,
                width: 56,
                backgroundColor: isFocused ? COLORS.sky700 : "#F4F5F5",
              }}
              className={`justify-center items-center rounded-full`}
            >
              {getIconByRoute(route.name, isFocused)}
            </AnimatedTouchableOpacity>
          );
        })}
      </View>
    </>
  );
};

export default CustomTabBar;
