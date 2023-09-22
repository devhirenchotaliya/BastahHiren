/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import { Provider } from "react-redux";
import React, { useEffect } from "react";
// import SplashScreen from "react-native-splash-screen";
import { LogBox, StatusBar, StyleSheet, View } from "react-native";

import store from "./src/redux";
import { colors } from "./src/theme/Colors";
import { ToastMsg } from "./src/components";
import MainNavigator from "./src/navigations/MainNavigator";
import { StripeProvider } from "@stripe/stripe-react-native";
import {
  APPLE_MERCHANT_ID,
  STRIPE_PUBLIC_KEY,
} from "./src/helper/apiConstants";
import { requestNotificationUserPermission } from "./src/helper/firebaseConfig";

// you can used this version of carousel
// "react-native-snap-carousel": "4.0.0-beta.6",

const App = () => {
  useEffect(() => {
    requestNotificationUserPermission();
    setTimeout(() => {
      // SplashScreen.hide();
    }, 1100);
    LogBox.ignoreAllLogs(true);
  }, []);

  return (
    <Provider store={store}>
      <StripeProvider
        publishableKey={STRIPE_PUBLIC_KEY}
        merchantIdentifier={APPLE_MERCHANT_ID} // required for Apple Pay
      >
        <View style={{ flex: 1 }}>
          <StatusBar backgroundColor={colors.white} barStyle={"dark-content"} />
          <MainNavigator />
          <ToastMsg />
        </View>
      </StripeProvider>
    </Provider>
  );
};

const styles = StyleSheet.create({});

export default App;
