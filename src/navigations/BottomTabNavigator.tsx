import React from "react";
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { fontFamily, screenName } from "../helper/constants";
import {
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { hp, wp } from "../helper/globalFunctions";
import { colors } from "../theme/Colors";
import { icons } from "../theme/Icons";
import Categories from "../screen/dashBoard/Categories";
import Businesses from "../screen/dashBoard/Businesses";
import MyShopping from "../screen/dashBoard/MyShopping";
import Profile from "../screen/dashBoard/Profile";
import { SafeAreaView } from "react-native-safe-area-context";
import { commonFontStyle } from "../theme/Fonts";
import HomeStackNavigator from "./HomeStackNavigator";
import { useAppSelector } from "../redux/hooks";

const Tab = createBottomTabNavigator();

const getIcons = (key: number) => {
  switch (key) {
    case 0:
      return icons.home;
    case 1:
      return icons.categories;
    case 2:
      return icons.businesses;
    case 3:
      return icons.myShopping;
    case 4:
      return icons.profile;
    default:
      break;
  }
};

const getSelectedIcons = (key: number) => {
  switch (key) {
    case 0:
      return icons.home_selected;
    case 1:
      return icons.categories_selected;
    case 2:
      return icons.businesses_selected;
    case 3:
      return icons.myShopping_selected;
    case 4:
      return icons.profile_selected;
    default:
      break;
  }
};

const TabBarItem = ({ state, navigation }: BottomTabBarProps) => {
  const { cartCount } = useAppSelector((state) => state.shopping);

  return (
    <SafeAreaView style={styles.itemContainer}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <Pressable
            key={route.key}
            onPress={onPress}
            style={styles.itemViewContainer}
          >
            <Image
              source={isFocused ? getSelectedIcons(index) : getIcons(index)}
              resizeMode="contain"
              style={styles.itemIconStyle}
            />
            <Text
              numberOfLines={1}
              style={{
                ...styles.itemLabelTextStyle,
                color: isFocused ? colors.grey : colors.inActiveTab,
              }}
            >
              {index === 3 ? "My Shopping" : route.name}
            </Text>
            {index === 3 ? (
              <>
                {cartCount > 0 && (
                  <View style={styles.countConatiner}>
                    <Text style={styles.countTextStyle}>{cartCount}</Text>
                  </View>
                )}
              </>
            ) : null}
          </Pressable>
        );
      })}
    </SafeAreaView>
  );
};

function BottomTabNavigator() {
  return (
    <Tab.Navigator
      tabBar={(props) => <TabBarItem {...props} />}
      initialRouteName={screenName.tabBarName.home}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name={screenName.tabBarName.home}
        component={HomeStackNavigator}
      />
      <Tab.Screen
        name={screenName.tabBarName.categories}
        component={Categories}
      />
      <Tab.Screen
        name={screenName.tabBarName.businesses}
        component={Businesses}
      />
      <Tab.Screen
        name={screenName.tabBarName.my_shopping}
        component={MyShopping}
      />
      <Tab.Screen name={screenName.tabBarName.profile} component={Profile} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  itemIconStyle: {
    height: hp(27),
    width: wp(27),
  },
  itemLabelTextStyle: {
    ...commonFontStyle(fontFamily.regular, 11, colors.black),
    marginTop: hp(5),
  },
  itemContainer: {
    height: hp(75),
    borderTopWidth: hp(0.5),
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    justifyContent: "space-between",
    borderTopColor: colors.borderGreyLight,
  },
  itemViewContainer: {
    flex: 1,
    height: hp(70),
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    marginBottom: Platform.OS === "ios" ? hp(20) : 0,
  },
  countConatiner: {
    top: hp(7),
    width: wp(20),
    right: wp(20),
    height: wp(20),
    position: "absolute",
    alignItems: "center",
    borderRadius: wp(10),
    justifyContent: "center",
    backgroundColor: colors.brown,
  },
  countTextStyle: {
    ...commonFontStyle(fontFamily.regular, 12, colors.white),
  },
});

export default BottomTabNavigator;
