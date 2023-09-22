import React, { useCallback, useEffect } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  ImageBackground,
  BackHandler,
} from "react-native";
import { colors } from "../../theme/Colors";

import { RouterProps } from "../../helper/types";
import { AuthHeader, BorderButton, PrimaryButton } from "../../components";
import { fontSize, getText, hp, wp } from "../../helper/globalFunctions";
import { string } from "../../i18n/locales/en";
import { SafeAreaView } from "react-native-safe-area-context";
import { commonFontStyle } from "../../theme/Fonts";
import { fontFamily, screenName } from "../../helper/constants";
import { icons } from "../../theme/Icons";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getCart } from "../../actions";
import { useFocusEffect } from "@react-navigation/native";

const OrderSuccess = ({ navigation, route }: RouterProps) => {
  //@ts-ignore
  const { orderDetails } = route?.params;
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector((state) => state.common);

  useEffect(() => {
    dispatch(getCart(() => {}, true));
  }, []);

  const hardwareBackPressCustom = useCallback(() => {
    navigation.navigate(screenName.home_stack);
    return true;
  }, []);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", hardwareBackPressCustom);
    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        hardwareBackPressCustom
      );
    };
  }, []);

  const onMyOrderPress = () => {
    navigation.navigate(screenName.my_orders, { isOrderSuccessScreen: true });
  };

  const onContinueShoppingPress = () => {
    navigation.navigate(screenName.tabBarName.home);
  };

  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      {/* <AuthHeader borderBottomWidth={0} /> */}
      <View style={{ height: hp(56) }} />
      <ScrollView style={styles.innerContainer}>
        <ImageBackground
          resizeMode="contain"
          source={icons.shadowImg}
          style={styles.shadowImgStyle}
        >
          <View style={styles.circleStyle}>
            <Image
              resizeMode="contain"
              style={styles.bagStyle}
              source={icons.orderBag}
            />
          </View>
          <View style={styles.rightCircleStyle}>
            <Image
              source={icons.right}
              resizeMode="contain"
              style={styles.rightIconStyle}
            />
          </View>
        </ImageBackground>

        <Text style={styles.titleTextStyle}>
          {getText(string.check_out.order_success)}
        </Text>
        <Text style={styles.greyTextStyle}>
          {getText(string.check_out.order_success_text)}
        </Text>
        <View style={styles.orderIdContainer}>
          <Text style={styles.orderIdTextStyle}>
            {"Order ID: "}
            {orderDetails?.order_code}
          </Text>
        </View>
        {!userInfo?.isGuest ? (
          <BorderButton
            onPress={onMyOrderPress}
            containerStyle={styles.buttonStyle}
            label={getText(string.check_out.my_orders)}
          />
        ) : null}

        <PrimaryButton
          onPress={onContinueShoppingPress}
          containerStyle={styles.buttonStyle}
          label={getText(string.check_out.continue_shopping)}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  innerContainer: {
    paddingHorizontal: wp(20),
  },
  titleTextStyle: {
    ...commonFontStyle(fontFamily.semiBold, 27, colors.primary),
    textAlign: "center",
    marginTop: -hp(1),
  },
  greyTextStyle: {
    ...commonFontStyle(fontFamily.regular, 16, colors.darkGrey),
    lineHeight: fontSize(30),
    marginVertical: hp(15),
    textAlign: "center",
  },
  buttonStyle: {
    marginHorizontal: wp(10),
    marginBottom: hp(25),
    marginTop: 0,
  },
  shadowImgStyle: {
    height: wp(210),
    width: wp(210),
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp(20),
  },
  circleStyle: {
    height: wp(155),
    width: wp(155),
    backgroundColor: colors.black3,
    borderRadius: wp(155 / 2),
    bottom: hp(15),
    justifyContent: "center",
    alignItems: "center",
  },
  bagStyle: {
    height: wp(102),
    width: wp(102),
  },
  rightCircleStyle: {
    height: wp(50),
    width: wp(50),
    position: "absolute",
    borderRadius: wp(50 / 2),
    backgroundColor: colors.grey,
    bottom: hp(50),
    right: wp(15),
    justifyContent: "center",
    alignItems: "center",
  },
  rightIconStyle: {
    height: wp(27),
    width: wp(27),
  },
  orderIdContainer: {
    borderWidth: 1,
    alignSelf: "center",
    paddingHorizontal: wp(25),
    paddingVertical: hp(15),
    borderRadius: wp(8),
    marginBottom: hp(50),
    marginTop: hp(10),
    borderStyle: "dashed",
    borderColor: colors.grey16,
    backgroundColor: colors.secondaryBrown,
  },
  orderIdTextStyle: {
    ...commonFontStyle(fontFamily.medium, 18, colors.primary),
    textAlign: "center",
  },
});

export default OrderSuccess;
