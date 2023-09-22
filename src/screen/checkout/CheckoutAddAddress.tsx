import React, { useCallback, useEffect } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { colors } from "../../theme/Colors";

import { RouterProps } from "../../helper/types";
import {
  AuthHeader,
  BorderButton,
  PrimaryButton,
  ProgressBar,
} from "../../components";
import {
  fontSize,
  getText,
  hp,
  infoToast,
  wp,
} from "../../helper/globalFunctions";
import { string } from "../../i18n/locales/en";
import { SafeAreaView } from "react-native-safe-area-context";
import { commonFontStyle } from "../../theme/Fonts";
import { fontFamily, screenName } from "../../helper/constants";
import { getAddress } from "../../actions";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useFocusEffect } from "@react-navigation/native";

const CheckoutAddAddress = ({ navigation }: RouterProps) => {
  const dispatch = useAppDispatch();
  const { addressList } = useAppSelector((state) => state.address);

  useEffect(() => {
    dispatch(getAddress());
  }, []);

  let defaultAddress =
    addressList.filter((i: any) => i?.is_default === 1) || [];

  const onAddNewAddressPress = () => {
    navigation.navigate(screenName.new_address);
  };

  const onConfirmPress = () => {
    if (defaultAddress?.length === 0) {
      infoToast("Please add a new address");
    } else {
      navigation.navigate(screenName.checkout_payment);
    }
  };

  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <AuthHeader title={getText(string.check_out.check_out)} />
      <ProgressBar index={1} />
      <ScrollView style={styles.innerContainer}>
        <Text style={styles.titleTextStyle}>
          {getText(string.check_out.add_address)}
        </Text>
        {defaultAddress?.length === 0 ? (
          <Text style={styles.noAddressTextStyle}>
            {getText(string.check_out.no_default_address)}
          </Text>
        ) : (
          <>
            <Text style={styles.labelTextStyle}>
              {defaultAddress?.[0]?.address?.address_type}
            </Text>
            <Text style={styles.addressTextStyle}>
              {defaultAddress?.[0]?.address?.address}
            </Text>
          </>
        )}
      </ScrollView>
      <BorderButton
        isAddIconShow
        onPress={onAddNewAddressPress}
        containerStyle={styles.buttonStyle}
        label={getText(string.my_address.add_new_address)}
      />
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
  innerContainer: {
    paddingHorizontal: wp(20),
  },
  titleTextStyle: {
    ...commonFontStyle(fontFamily.medium, 22, colors.primary),
    marginTop: hp(30),
  },
  labelTextStyle: {
    ...commonFontStyle(fontFamily.medium, 20, colors.primary),
    marginTop: hp(40),
  },
  noAddressTextStyle: {
    ...commonFontStyle(fontFamily.medium, 18, colors.whiteGray),
    marginTop: hp(40),
    // textAlign: "center",
  },
  addressTextStyle: {
    ...commonFontStyle(fontFamily.regular, 15, colors.darkGrey),
    marginTop: hp(10),
    lineHeight: fontSize(27),
  },
  buttonStyle: {
    marginHorizontal: wp(16),
    marginBottom: hp(25),
    marginTop: 0,
  },
});

export default CheckoutAddAddress;
