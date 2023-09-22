import React, { useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { colors } from "../../theme/Colors";

import { RouterProps } from "../../helper/types";
import {
  AuthHeader,
  PaymentItem,
  PrimaryButton,
  ProgressBar,
} from "../../components";
import { getText, hp, infoToast, wp } from "../../helper/globalFunctions";
import { string } from "../../i18n/locales/en";
import { SafeAreaView } from "react-native-safe-area-context";
import { commonFontStyle } from "../../theme/Fonts";
import { fontFamily, screenName } from "../../helper/constants";
import { paymentMethods } from "../../helper/dummyData";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getCart } from "../../actions";

const CheckoutPayment = ({ navigation, route }: RouterProps) => {
  const dispatch = useAppDispatch();
  const { settingData, userInfo } = useAppSelector((state) => state.common);
  const [selectedId, setSelectedId] = useState<number>();

  const onConfirmPress = () => {
    if (selectedId === undefined) {
      infoToast("Please select any payment options");
    } else {
      let params = {
        pay_method: paymentMethods?.[selectedId]?.payment_method,
      };
      dispatch(
        getCart(
          () => {
            if (userInfo?.isGuest) {
              navigation.navigate(screenName.checkout_order_review, {
                selectedIndex: selectedId,
                guestOrderData: route?.params?.orderData,
              });
            } else {
              navigation.navigate(screenName.checkout_order_review, {
                selectedIndex: selectedId,
              });
            }
          },
          false,
          params
        )
      );
    }
  };

  const onPressItem = (index: number) => {
    setSelectedId(index);
  };

  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <AuthHeader title={getText(string.check_out.check_out)} />
      <ProgressBar index={2} />
      <ScrollView style={styles.innerContainer}>
        <Text style={styles.titleTextStyle}>
          {getText(string.check_out.choose_payment_method)}
        </Text>
        <FlatList
          scrollEnabled={false}
          style={styles.listContainer}
          data={paymentMethods}
          renderItem={({ item, index }) => {
            return (
              <PaymentItem
                data={item}
                key={index}
                index={index}
                selectedId={selectedId}
                cashAmount={settingData?.cash_fee}
                onItemPress={() => onPressItem(index)}
              />
            );
          }}
          ListFooterComponent={<View style={{ height: hp(20) }} />}
          keyExtractor={(item, index) => index.toString()}
        />
      </ScrollView>

      <PrimaryButton
        onPress={onConfirmPress}
        containerStyle={styles.buttonStyle}
        label={getText(string.check_out.confirm)}
      />
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
    marginTop: 0,
  },
  listContainer: {
    marginVertical: hp(10),
    paddingHorizontal: wp(14),
  },
});

export default CheckoutPayment;
