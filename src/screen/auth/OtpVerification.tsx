//import liraries
import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";

import {
  AccountCreateModal,
  AuthHeader,
  PrimaryButton,
} from "../../components";
import { fontFamily, screenName } from "../../helper/constants";
import {
  dispatchNavigation,
  fontSize,
  getText,
  hp,
  infoToast,
  wp,
} from "../../helper/globalFunctions";
import { string } from "../../i18n/locales/en";
import { colors } from "../../theme/Colors";
import { commonFontStyle } from "../../theme/Fonts";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { verifyOTP } from "../../actions";

// create a component
const OtpVerification = ({ navigation, route }: any) => {
  const dispatch = useAppDispatch();

  const { phone } = route?.params;
  const [value, setValue] = useState<string>("");
  const [isModal, setIsModal] = useState<boolean>(false);
  const ref = useBlurOnFulfill({ value, cellCount: 4 });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  console.log("value", value);

  const onPressNext = () => {
    if (value.length === 0) {
      infoToast("Please enter your OTP");
    } else {
      let data = new FormData();
      data.append("phone", phone);
      data.append("otp", value);
      const obj = {
        data,
        onSuccess: (res: any) => {
          setIsModal(true);
        },
        onFailure: () => {},
      };
      dispatch(verifyOTP(obj));
    }
  };

  const onStartShoppingPress = () => {
    setIsModal(false);
    setTimeout(() => {
      dispatchNavigation(screenName.bottom_tab_navigator);
    }, 300);
  };

  return (
    <SafeAreaView style={styles.container}>
      <AuthHeader
        title={getText(string.Phone_number_verification.otp_verification)}
      />
      <KeyboardAwareScrollView keyboardShouldPersistTaps={"handled"}>
        <View style={styles.bodyStyle}>
          <Text style={styles.headerText}>
            {getText(string.otp_verification.enter_otp_code)}
          </Text>

          <Text style={styles.subHeaderText}>
            {getText(string.otp_verification.otp_code_text)}
            <Text style={styles.phoneTextSTyle}> {"+971 " + phone}</Text>
          </Text>

          <CodeField
            ref={ref}
            {...props}
            value={value}
            onChangeText={setValue}
            cellCount={4}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({ index, symbol, isFocused }) => (
              <View style={styles.cellView}>
                <Text
                  key={index}
                  style={[styles.cell, isFocused && styles.focusCell]}
                  onLayout={getCellOnLayoutHandler(index)}
                >
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              </View>
            )}
          />
          <PrimaryButton
            onPress={onPressNext}
            containerStyle={styles.containerStyle}
            label={getText(string.Phone_number_verification.next)}
          />
        </View>
      </KeyboardAwareScrollView>
      <AccountCreateModal
        isVisible={isModal}
        onStartShoppingPress={onStartShoppingPress}
      />
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  bodyStyle: {
    flex: 1,
    backgroundColor: colors.white,
    marginHorizontal: wp(20),
    marginTop: hp(35),
  },
  headerText: {
    ...commonFontStyle(fontFamily.regular, 30, colors.primary),
    lineHeight: fontSize(50),
  },
  subHeaderText: {
    ...commonFontStyle(fontFamily.regular, 18, colors.grey),
    lineHeight: fontSize(25),
    marginBottom: hp(45),
    marginTop: hp(5),
  },
  containerStyle: {
    marginTop: hp(40),
  },
  codeFieldRoot: {
    marginHorizontal: wp(3),
  },
  cellView: {
    width: wp(58),
    height: hp(58),
    backgroundColor: colors.white,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: colors.inputBorder,
  },
  cell: {
    ...commonFontStyle(fontFamily.regular, 30, colors.black),
    textAlign: "center",
  },
  focusCell: {
    borderColor: "#000",
  },
  phoneTextSTyle: {
    color: colors.primary,
  },
});

//make this component available to the app
export default OtpVerification;
