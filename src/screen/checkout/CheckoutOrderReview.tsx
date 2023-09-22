import React, { useEffect, useState } from "react";
import {
  FlatList,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { colors } from "../../theme/Colors";

import { RouterProps } from "../../helper/types";
import {
  AuthHeader,
  OrderItem,
  PaymentItem,
  PrimaryButton,
  ProgressBar,
  RowItem,
} from "../../components";
import {
  wp,
  hp,
  isIos,
  getText,
  fontSize,
  infoToast,
  getFormData,
  getGuestUserAddress,
} from "../../helper/globalFunctions";
import { string } from "../../i18n/locales/en";
import { SafeAreaView } from "react-native-safe-area-context";
import { commonFontStyle } from "../../theme/Fonts";
import { fontFamily, screenName } from "../../helper/constants";
import { paymentMethods } from "../../helper/dummyData";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { placeOrder, setUpIntentCard } from "../../actions";
import {
  useStripe,
  PlatformPay,
  isPlatformPaySupported,
  confirmPlatformPayPayment,
} from "@stripe/stripe-react-native";
import { stripeConfig } from "../../helper/apiConstants";

const CheckoutOrderReview = ({ navigation, route }: RouterProps) => {
  const dispatch = useAppDispatch();
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [clientSecret, setClientSecret] = useState("");

  const { settingData, userInfo } = useAppSelector((state) => state.common);
  const { addressList } = useAppSelector((state) => state.address);
  const { cartItemData } = useAppSelector((state) => state.shopping);

  useEffect(() => {
    if (route?.params?.selectedIndex !== 1) {
      initializePaymentSheet();
    }
  }, []);

  const initializePaymentSheet = async () => {
    let data = new FormData();
    data.append("amount", cartItemData?.grandTotal);
    let obj = {
      data,
      onSuccess: async (res: any) => {
        const { paymentIntent, ephemeralKey, customer } = res;
        setClientSecret(paymentIntent);
        await initPaymentSheet({
          merchantDisplayName: "Bastah, Inc.",
          customerId: customer,
          customerEphemeralKeySecret: ephemeralKey,
          paymentIntentClientSecret: paymentIntent,
          allowsDelayedPaymentMethods: true,
          defaultBillingDetails: {
            name: userInfo?.name,
          },
        })
          .then((response) => {
            console.log("response", response);
          })
          .catch((error) => {
            infoToast("Strip Error :" + error.message);
          });
      },
      onFailure: () => {},
    };
    dispatch(setUpIntentCard(obj));
  };

  let defaultAddress =
    addressList.filter((i: any) => i?.is_default === 1) || [];

  const orderConfirm = () => {
    let data = new FormData();
    if (userInfo?.isGuest) {
      data = getFormData(route?.params?.guestOrderData);
      data.append(
        "pay_method",
        paymentMethods[route?.params?.selectedIndex]?.payment_method
      );
    } else {
      data.append(
        "pay_method",
        paymentMethods[route?.params?.selectedIndex]?.payment_method
      );
      data.append("user_address_id", defaultAddress?.[0]?.id);
    }
    let obj = {
      data,
      onSuccess: (response: any) => {
        console.log("response", response);
        navigation.navigate(screenName.order_success, {
          orderDetails: response,
        });
      },
      onFailure: () => {},
    };
    dispatch(placeOrder(obj));
  };

  const onConfirmPress = async () => {
    if (route?.params?.selectedIndex === 0) {
      const { error } = await presentPaymentSheet();
      if (error) {
        infoToast(error.message);
      } else {
        // "Card";
        orderConfirm();
      }
    } else if (route?.params?.selectedIndex === 1) {
      // "Cash";
      orderConfirm();
    } else if (route?.params?.selectedIndex === 2) {
      if (isIos) {
        //Apple pay
        applePayPayment();
      } else {
        // Google Pay
        googlePayPayment();
      }
    }
  };

  const googlePayPayment = async () => {
    if (await isPlatformPaySupported({ googlePay: { testEnv: false } })) {
      const { error } = await confirmPlatformPayPayment(clientSecret, {
        googlePay: {
          testEnv: false,
          allowCreditCards: true,
          merchantName: stripeConfig.merchantName,
          currencyCode: stripeConfig.currencyCode,
          merchantCountryCode: stripeConfig.merchantCountryCode,
        },
      });
      if (error) {
        infoToast("Error GooglePay " + error?.code + ", " + error.message);
        return;
      } else {
        // Google Pay
        orderConfirm();
      }
    } else {
      infoToast("Google Pay is not supported.");
    }
  };

  const applePayPayment = async () => {
    if (await isPlatformPaySupported()) {
      const { error } = await confirmPlatformPayPayment(clientSecret, {
        applePay: {
          cartItems: [
            {
              label: stripeConfig.merchantName,
              amount: cartItemData?.grandTotal?.toString(),
              paymentType: PlatformPay.PaymentType.Immediate,
            },
          ],
          merchantCountryCode: stripeConfig.merchantCountryCode,
          currencyCode: stripeConfig.currencyCode,
        },
      });
      if (error) {
        infoToast("Error ApplePay " + error?.code + ", " + error.message);
      } else {
        console.log("Apple Pay Success");
        // Apple Pay
        orderConfirm();
      }
    } else {
      infoToast(
        "Your device is not support apple pay, please set up apple pay."
      );
    }
  };

  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <AuthHeader title={getText(string.check_out.check_out)} />
      <ProgressBar index={3} />
      <ScrollView style={styles.innerContainer}>
        <Text style={styles.titleTextStyle}>
          {getText(string.check_out.order_review)}
        </Text>
        <Text style={styles.labelTextStyle}>
          {getText(string.check_out.delivery_address)}
        </Text>
        {userInfo.isGuest ? (
          <Text style={styles.addressTextStyle}>
            {getGuestUserAddress(route?.params?.guestOrderData)}
          </Text>
        ) : (
          <Text style={styles.addressTextStyle}>
            {defaultAddress?.[0]?.address?.address}
          </Text>
        )}

        <Text style={{ ...styles.labelTextStyle }}>
          {getText(string.check_out.payment_method)}
        </Text>
        <FlatList
          scrollEnabled={false}
          style={styles.listContainer}
          data={[paymentMethods[route?.params?.selectedIndex]]}
          renderItem={({ item, index }) => {
            return (
              <PaymentItem
                data={item}
                key={index}
                index={index}
                selectedId={index}
                cashAmount={settingData?.cash_fee}
              />
            );
          }}
          ListFooterComponent={<View style={{ height: hp(20) }} />}
          keyExtractor={(item, index) => index.toString()}
        />
        <Text style={{ ...styles.labelTextStyle, marginTop: 0 }}>
          {getText(string.check_out.order_items)}
        </Text>
        <FlatList
          scrollEnabled={false}
          style={{ marginTop: hp(5) }}
          data={cartItemData?.cartItems || []}
          renderItem={({ item, index }) => {
            return <OrderItem data={item} key={index} />;
          }}
          ListFooterComponent={<View style={{ height: hp(20) }} />}
          keyExtractor={(item, index) => index.toString()}
        />
        <Text style={styles.titleTextStyle}>
          {getText(string.check_out.order_summary)}
        </Text>
        <View style={styles.shadowContainer}>
          <RowItem
            title={getText(string.cart.subtotal)}
            value={"AED " + (cartItemData?.subTotal || 0)}
          />
          {cartItemData?.cash_fee > 0 && (
            <RowItem
              title={getText(string.cart.cod)}
              value={"AED " + (cartItemData?.cash_fee || 0)}
            />
          )}
          <RowItem
            title={getText(string.cart.shipping_fee)}
            value={
              cartItemData?.deliveryCharges > 0
                ? "AED " + (cartItemData?.deliveryCharges || 0)
                : "Standard - Fee"
            }
          />
          <RowItem
            title={getText(string.cart.vat) + cartItemData?.vat + "%"}
            value={"AED " + (cartItemData?.vatAmount || 0)}
          />
          <View style={styles.totalContainer}>
            <Text
              style={{
                ...styles.rowItemTitleTextStyle,
                fontFamily: fontFamily.semiBold,
                fontSize: fontSize(20),
              }}
            >
              {getText(string.cart.total)}
              <Text style={styles.smallTextStyle}>
                {getText(string.cart.included_of_vat)}
              </Text>
            </Text>
            <Text
              style={{
                ...styles.rowItemTitleTextStyle,
                fontFamily: fontFamily.semiBold,
              }}
            >
              {"AED " + (cartItemData?.grandTotal || 0)}
            </Text>
          </View>
        </View>
        <PrimaryButton
          onPress={onConfirmPress}
          containerStyle={styles.buttonStyle}
          label={getText(string.check_out.confirm)}
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
  innerContainer: {},
  titleTextStyle: {
    ...commonFontStyle(fontFamily.medium, 22, colors.primary),
    paddingHorizontal: wp(20),
  },
  buttonStyle: {
    marginHorizontal: wp(25),
    marginBottom: hp(25),
    marginTop: hp(30),
  },
  listContainer: {
    marginVertical: hp(10),
    paddingHorizontal: wp(14),
  },
  labelTextStyle: {
    ...commonFontStyle(fontFamily.regular, 18, colors.primary),
    marginTop: hp(30),
    paddingHorizontal: wp(20),
  },
  addressTextStyle: {
    ...commonFontStyle(fontFamily.regular, 15, colors.darkGrey),
    marginTop: hp(10),
    lineHeight: fontSize(27),
    paddingHorizontal: wp(20),
  },
  shadowContainer: {
    marginHorizontal: wp(20),
    paddingVertical: wp(20),
    marginTop: hp(15),
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 3,
    backgroundColor: colors.white,
    borderRadius: wp(10),
    marginBottom: hp(5),
  },
  rowSpaceStyle: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  rowItemTitleTextStyle: {
    ...commonFontStyle(fontFamily.regular, 18, colors.primary),
  },
  rowItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: wp(18),
    marginBottom: hp(15),
  },
  totalContainer: {
    borderTopWidth: 1,
    borderTopColor: colors.borderGreyLight,
    paddingHorizontal: wp(18),
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: hp(18),
  },
  smallTextStyle: {
    ...commonFontStyle(fontFamily.regular, 15, colors.grey15),
  },
});

export default CheckoutOrderReview;
