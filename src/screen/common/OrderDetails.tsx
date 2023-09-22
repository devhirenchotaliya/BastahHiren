import React, { useEffect } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { colors } from "../../theme/Colors";

import { RouterProps } from "../../helper/types";
import { AuthHeader, OrderItem, RowItem } from "../../components";
import {
  hp,
  wp,
  getText,
  fontSize,
  getPaymentMethodWiseIcon,
  getStatusColor,
} from "../../helper/globalFunctions";
import { string } from "../../i18n/locales/en";
import { SafeAreaView } from "react-native-safe-area-context";
import { commonFontStyle } from "../../theme/Fonts";
import { fontFamily } from "../../helper/constants";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import moment from "moment";
import { getOrderDetails } from "../../actions";

const OrderDetails = ({ navigation, route }: RouterProps) => {
  const dispatch = useAppDispatch();
  const { orderItemDetails } = useAppSelector((state) => state.order);

  useEffect(() => {
    let params = {
      order_id: route?.params?.order_id,
    };
    dispatch(getOrderDetails(params));
  }, []);

  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <AuthHeader borderBottomWidth={0} />

      {Object.keys(orderItemDetails)?.length ? (
        <ScrollView style={styles.scrollContainer}>
          <Text style={styles.orderIdTextStyle}>
            {getText(string.order_details.order_id)}
            {" - "}
            {orderItemDetails?.order_code}
          </Text>
          <Text style={styles.dateTextStyle}>
            {"Placed on "}
            {moment(orderItemDetails?.created_at).format(
              "MMM DD, YYYY, HH:mmA"
            )}
          </Text>
          <View style={styles.boxContainer}>
            <View
              style={{
                ...styles.innerBoxContainer,
                borderRightWidth: 1,
                borderColor: colors.borderGreyLight,
              }}
            >
              <Text style={styles.blackBoxTextStyle}>
                {getText(string.order_details.shipping_address)}
              </Text>
              <Text style={styles.addressTitleTextStyle}>
                {orderItemDetails?.delivery_address?.address?.address_type}
                {" Address"}
              </Text>
              <Text numberOfLines={2} style={styles.addressTextStyle}>
                {orderItemDetails?.delivery_address?.address?.address}
              </Text>
            </View>
            <View style={styles.innerBoxContainer}>
              <Text style={styles.blackBoxTextStyle}>
                {getText(string.order_details.mobile_number)}
              </Text>
              <Text style={styles.phoneTextStyle}>
                {orderItemDetails?.delivery_address?.address?.phone}
              </Text>
            </View>
          </View>
          <FlatList
            scrollEnabled={false}
            style={{ marginTop: hp(5) }}
            data={orderItemDetails?.order_items || []}
            renderItem={({ item, index }) => {
              return <OrderItem data={item} key={index} />;
            }}
            keyExtractor={(item, index) => index.toString()}
          />
          <View style={styles.innerContainer}>
            <Text style={styles.titleTextStyle}>
              {getText(string.check_out.payment_method)}
            </Text>
            <View
              style={{
                ...styles.shadowContainer,
                ...styles.rowWithPadding,
              }}
            >
              <Image
                resizeMode="contain"
                style={styles.cashIconStyle}
                source={getPaymentMethodWiseIcon(orderItemDetails?.pay_method)}
              />
              <Text style={styles.paymentTextStyle}>
                {getText(string.order_details.payment_with) +
                  orderItemDetails?.pay_method || ""}
              </Text>
            </View>
            <View
              style={{
                ...styles.shadowContainer,
                ...styles.rowWithPadding,
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.orderStatusTextStyle}>
                {getText(string.order_details.order_status)}
              </Text>
              <Text
                style={{
                  ...styles.orderStatusValueTextStyle,
                  color: getStatusColor(orderItemDetails?.status),
                }}
              >
                {orderItemDetails?.status}
              </Text>
            </View>
            <Text style={styles.titleTextStyle}>
              {getText(string.check_out.order_summary)}
            </Text>
            <View style={styles.shadowContainer}>
              <RowItem
                title={getText(string.cart.subtotal)}
                value={"AED " + (orderItemDetails?.sub_total || 0)}
              />
              {orderItemDetails?.cash_fee > 0 ? (
                <RowItem
                  title={getText(string.cart.cod)}
                  value={"AED " + (orderItemDetails?.cash_fee || 0)}
                />
              ) : null}

              <RowItem
                title={getText(string.cart.shipping_fee)}
                value={
                  orderItemDetails?.delivery_fee > 0
                    ? "AED " + (orderItemDetails?.delivery_fee || 0)
                    : "Standard - Fee"
                }
              />
              <RowItem
                title={getText(string.cart.vat) + orderItemDetails?.vat + "%"}
                value={"AED " + (orderItemDetails?.vat_amount || 0)}
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
                  {"AED " + (orderItemDetails?.grand_total || 0)}
                </Text>
              </View>
            </View>
          </View>
          <View style={{ height: hp(30) }} />
        </ScrollView>
      ) : (
        <View />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  buttonContainer: {
    marginHorizontal: wp(25),
    marginVertical: hp(30),
  },
  orderIdTextStyle: {
    ...commonFontStyle(fontFamily.medium, 20, colors.primary),
    textAlign: "center",
  },
  dateTextStyle: {
    ...commonFontStyle(fontFamily.regular, 16, colors.grey19),
    textAlign: "center",
    marginVertical: hp(10),
  },
  boxContainer: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderBottomWidth: 3,
    borderColor: colors.borderGreyLight,
  },
  innerBoxContainer: {
    flex: 1,
    height: hp(170),
    padding: wp(20),
  },
  blackBoxTextStyle: {
    ...commonFontStyle(fontFamily.regular, 17, colors.primary),
    marginTop: hp(5),
  },
  addressTitleTextStyle: {
    ...commonFontStyle(fontFamily.regular, 16, colors.grey),
    marginTop: hp(15),
  },
  addressTextStyle: {
    ...commonFontStyle(fontFamily.regular, 13, colors.darkGrey),
    lineHeight: fontSize(25),
    marginTop: hp(5),
  },
  phoneTextStyle: {
    ...commonFontStyle(fontFamily.regular, 15, colors.darkGrey),
    marginTop: hp(10),
  },
  scrollContainer: {
    flex: 1,
    marginTop: -hp(20),
  },
  titleTextStyle: {
    ...commonFontStyle(fontFamily.medium, 20, colors.primary),
    paddingHorizontal: wp(20),
    marginTop: hp(20),
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
  innerContainer: { backgroundColor: colors.backGroundGrey },
  rowItemTitleTextStyle: {
    ...commonFontStyle(fontFamily.regular, 18, colors.primary),
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
  cashIconStyle: {
    height: wp(25),
    width: wp(40),
  },
  paymentTextStyle: {
    ...commonFontStyle(fontFamily.regular, 18, colors.primary),
    marginLeft: wp(20),
  },
  rowWithPadding: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: wp(16),
  },
  orderStatusTextStyle: {
    ...commonFontStyle(fontFamily.medium, 19, colors.primary),
  },
  orderStatusValueTextStyle: {
    ...commonFontStyle(fontFamily.medium, 19, colors.green1),
  },
});

export default OrderDetails;
