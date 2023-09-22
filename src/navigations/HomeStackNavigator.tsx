import React, { FC } from "react";
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { screenName } from "../helper/constants";

import Home from "../screen/dashBoard/Home";
import { RootStackParamList } from "./StackNavigator";
import CategoriesDetails from "../screen/categories/CategoriesDetails";
import ItemList from "../screen/categories/ItemList";

const options: NativeStackNavigationOptions = {
  headerShown: false,
  animation: "slide_from_bottom",
  animationDuration: 500,
};
const Stack = createNativeStackNavigator<RootStackParamList>();

const HomeStackNavigator: FC = () => {
  return (
    <Stack.Navigator screenOptions={options}>
      <Stack.Screen // @ts-ignore
        name={screenName.home_stack}
        component={Home}
      />
      {/* <Stack.Screen // @ts-ignore
        name={screenName.categories_details}
        component={CategoriesDetails}
      /> */}
    </Stack.Navigator>
  );
};
export default HomeStackNavigator;
