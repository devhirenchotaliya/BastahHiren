import React, { FC } from "react";
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { screenName } from "../helper/constants";
import PhoneNumberVerification from "../screen/auth/PhoneNumberVerification";
import SignIn from "../screen/auth/SignIn";
import SignUp from "../screen/auth/SignUp";
import OtpVerification from "../screen/auth/OtpVerification";
import ResetPassword from "../screen/auth/ResetPassword";
import NewPassword from "../screen/auth/NewPassword";
import BottomTabNavigator from "./BottomTabNavigator";
import ItemDetails from "../screen/details/ItemDetails";
import Filter from "../screen/categories/Filter";
import SellerProfile from "../screen/businesses/SellerProfile";
import AddReview from "../screen/businesses/AddReview";
import Search from "../screen/categories/Search";
import EditProfile from "../screen/common/EditProfile";
import MyAddress from "../screen/common/MyAddress";
import NewAddress from "../screen/common/NewAddress";
import CheckoutAddAddress from "../screen/checkout/CheckoutAddAddress";
import CheckoutPayment from "../screen/checkout/CheckoutPayment";
import CheckoutOrderReview from "../screen/checkout/CheckoutOrderReview";
import OrderSuccess from "../screen/checkout/OrderSuccess";
import MyOrders from "../screen/common/MyOrders";
import Loading from "../screen/auth/Loading";
import MyFavorite from "../screen/common/MyFavorite";
import MapLocation from "../screen/common/MapLocation";
import OrderDetails from "../screen/common/OrderDetails";
import GuestCheckout from "../screen/guest/GuestCheckout";
import AllViewItem from "../screen/common/AllViewItem";
import MyCards from "../screen/common/MyCards";
import Notification from "../screen/common/Notification";
import ItemList from "../screen/categories/ItemList";

export type RootStackParamList = {
  Loading: undefined;
  SignIn: undefined;
  SignUp: undefined;
  PhoneNumberVerification: { user_id: number };
  OtpVerification: { phone: string };
  ResetPassword: undefined;
  NewPassword: undefined;
  //Tab bar
  BottomTabNavigator: undefined;
  Home: undefined;
  Categories: undefined;
  Businesses: undefined;
  MyShopping: undefined;
  Profile: undefined;

  ItemDetails: undefined;
  Filter: undefined;
  SellerProfile: undefined;
  AddReview: undefined;
  Search: undefined;
  EditProfile: undefined;
  MyAddress: undefined;
  NewAddress: undefined;
  CheckoutAddAddress: undefined;
  CheckoutPayment: undefined;
  CheckoutOrderReview: { selectedIndex: number };
  OrderSuccess: undefined;
  MyOrders: undefined;
  MyFavorite: undefined;
  OrderDetails: undefined;
  GuestCheckout: undefined;
  AllViewItem: undefined;
  MyCards: undefined;
  Notification: undefined;
};

const options: NativeStackNavigationOptions = {
  headerShown: false,
  animation: "slide_from_bottom",
  animationDuration: 500,
  gestureEnabled: false,
};
const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigator: FC = () => {
  return (
    <Stack.Navigator
      // @ts-ignore
      initialRouteName={screenName.loading}
      screenOptions={options}
    >
      {/* //Auth navigation */}
      <Stack.Screen
        // @ts-ignore
        name={screenName.loading}
        component={Loading}
      />
      <Stack.Screen
        // @ts-ignore
        name={screenName.sign_in}
        component={SignIn}
      />
      <Stack.Screen
        // @ts-ignore
        name={screenName.sign_up}
        component={SignUp}
      />
      <Stack.Screen
        // @ts-ignore
        name={screenName.phone_verification}
        component={PhoneNumberVerification}
      />
      <Stack.Screen
        // @ts-ignore
        name={screenName.otp_verification}
        component={OtpVerification}
      />
      <Stack.Screen
        // @ts-ignore
        name={screenName.reset_password}
        component={ResetPassword}
      />
      <Stack.Screen
        // @ts-ignore
        name={screenName.new_password}
        component={NewPassword}
      />
      {/* // Bottom Tab bar */}

      <Stack.Screen
        // @ts-ignore
        name={screenName.bottom_tab_navigator}
        component={BottomTabNavigator}
      />

      <Stack.Screen // @ts-ignore
        name={screenName.item_list}
        component={ItemList}
      />

      {/* // ItemDetails */}
      <Stack.Screen
        // @ts-ignore
        name={screenName.item_details}
        component={ItemDetails}
      />

      {/* // Filter */}
      <Stack.Screen
        // @ts-ignore
        name={screenName.filter}
        component={Filter}
      />
      {/* // Businesses */}
      <Stack.Screen
        // @ts-ignore
        name={screenName.seller_profile}
        component={SellerProfile}
      />
      <Stack.Screen
        // @ts-ignore
        name={screenName.add_review}
        component={AddReview}
      />

      {/* // Search */}
      <Stack.Screen
        // @ts-ignore
        name={screenName.search}
        component={Search}
      />
      {/* // profile */}
      <Stack.Screen
        // @ts-ignore
        name={screenName.edit_profile}
        component={EditProfile}
      />
      <Stack.Screen
        // @ts-ignore
        name={screenName.my_address}
        component={MyAddress}
      />
      <Stack.Screen
        // @ts-ignore
        name={screenName.new_address}
        component={NewAddress}
      />

      {/* //checkout */}
      <Stack.Screen
        // @ts-ignore
        name={screenName.checkout_add_address}
        component={CheckoutAddAddress}
      />
      <Stack.Screen
        // @ts-ignore
        name={screenName.checkout_payment}
        component={CheckoutPayment}
      />
      <Stack.Screen
        // @ts-ignore
        name={screenName.checkout_order_review}
        component={CheckoutOrderReview}
      />
      <Stack.Screen
        // @ts-ignore
        name={screenName.order_success}
        component={OrderSuccess}
      />
      <Stack.Screen
        // @ts-ignore
        name={screenName.my_orders}
        component={MyOrders}
      />
      <Stack.Screen
        // @ts-ignore
        name={screenName.my_favorite}
        component={MyFavorite}
      />
      <Stack.Screen
        // @ts-ignore
        name={screenName.map_location}
        component={MapLocation}
      />
      <Stack.Screen
        // @ts-ignore
        name={screenName.order_details}
        component={OrderDetails}
      />
      {/* // Guest */}
      <Stack.Screen
        // @ts-ignore
        name={screenName.guest_checkout}
        component={GuestCheckout}
      />
      <Stack.Screen
        // @ts-ignore
        name={screenName.all_view_item}
        component={AllViewItem}
      />
      <Stack.Screen
        // @ts-ignore
        name={screenName.my_cards}
        component={MyCards}
      />
      <Stack.Screen
        // @ts-ignore
        name={screenName.notification}
        component={Notification}
      />
    </Stack.Navigator>
  );
};
export default StackNavigator;
