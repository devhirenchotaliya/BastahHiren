//import liraries
import React, { useEffect, useRef, useState } from "react";
import {
  InteractionManager,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { AuthHeader, PhoneInput, PrimaryButton } from "../../components";
import { fontFamily, screenName } from "../../helper/constants";
import {
  fontSize,
  getText,
  hp,
  infoToast,
  wp,
} from "../../helper/globalFunctions";
import { string } from "../../i18n/locales/en";
import { colors } from "../../theme/Colors";
import { commonFontStyle } from "../../theme/Fonts";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { RouterProps } from "../../helper/types";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { sendVerifyCode } from "../../actions";

// create a component
const PhoneNumberVerification = ({ navigation, route }: any) => {
  const dispatch = useAppDispatch();

  const { user_id } = route.params;
  const [phoneNum, setPhoneNum] = useState<string>("");
  const phoneInputRef = useRef(null);

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      phoneInputRef?.current?.focus();
    });
  }, []);

  const onPressNext = () => {
    if (phoneNum.trim().length === 0) {
      infoToast("Please enter your phone number");
    } else if (phoneNum.trim().length !== 9) {
      infoToast("Please enter valid phone number");
    } else {
      let data = new FormData();
      data.append("phone", phoneNum);
      data.append("user_id", user_id);
      const obj = {
        data,
        onSuccess: (res: any) => {
          navigation.navigate(screenName.otp_verification, { phone: phoneNum });
        },
        onFailure: () => {},
      };
      dispatch(sendVerifyCode(obj));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <AuthHeader
        title={getText(string.Phone_number_verification.otp_verification)}
      />
      <KeyboardAwareScrollView keyboardShouldPersistTaps={"handled"}>
        <View style={styles.bodyStyle}>
          <Text style={styles.headerText}>
            {getText(string.Phone_number_verification.enter_mobie_num)}
          </Text>

          <Text style={styles.subHeaderText}>
            {getText(string.Phone_number_verification.send_confirmation_code)}
          </Text>

          <PhoneInput
            autoFocus={true}
            value={phoneNum}
            countryCode="+971"
            onChangeText={(t: string) => setPhoneNum(t)}
          />
          <PrimaryButton
            onPress={onPressNext}
            containerStyle={styles.containerStyle}
            label={getText(string.Phone_number_verification.next)}
          />
        </View>
      </KeyboardAwareScrollView>
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
    lineHeight: fontSize(50),
    marginBottom: hp(45),
    marginTop: hp(5),
  },
  containerStyle: {
    marginTop: hp(30),
  },
});

//make this component available to the app
export default PhoneNumberVerification;
