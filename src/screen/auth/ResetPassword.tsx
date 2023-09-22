import React, { FC, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { colors } from "../../theme/Colors";
import { AuthHeader, Input, PrimaryButton } from "../../components";
import {
  fontSize,
  getText,
  hp,
  infoToast,
  wp,
} from "../../helper/globalFunctions";
import { string } from "../../i18n/locales/en";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { commonFontStyle } from "../../theme/Fonts";
import { fontFamily, screenName } from "../../helper/constants";
import { RouterProps } from "../../helper/types";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { emailCheck } from "../../helper/validation";
import { forgotPassword } from "../../actions";

const ResetPassword = ({ navigation }: RouterProps) => {
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState<string>("");

  const onPressSendInstructions = () => {
    if (email.trim().length === 0) {
      infoToast("Please enter your email address");
    } else if (!emailCheck(email)) {
      infoToast("Please enter your valid email address");
    } else {
      let data = new FormData();
      data.append("email", email);
      const obj = {
        data,
        onSuccess: () => {},
        onFailure: () => {},
      };
      dispatch(forgotPassword(obj));
    }
  };
  // navigation.navigate(screenName.new_password);

  return (
    <SafeAreaView style={styles.container}>
      <AuthHeader
        borderBottomWidth={0}
        title={getText(string.forgot_password.reset_password)}
      />
      <KeyboardAwareScrollView keyboardShouldPersistTaps={"handled"}>
        <View style={styles.bodyStyle}>
          <Text style={styles.infoTextStyle}>
            {string.forgot_password.reset_password_info}
          </Text>
          <Input
            value={email}
            theme="second"
            placeholder="williams@david.com"
            onChangeText={(t: string) => setEmail(t)}
            label={getText(string.forgot_password.email_address)}
          />
          <View style={{ height: hp(40) }} />
          <PrimaryButton
            onPress={onPressSendInstructions}
            label={getText(string.forgot_password.send_instructions)}
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  bodyStyle: {
    flex: 1,
    backgroundColor: colors.white,
    marginHorizontal: wp(20),
  },
  infoTextStyle: {
    ...commonFontStyle(fontFamily.regular, 18, colors.black),
    opacity: 0.4,
    lineHeight: fontSize(32),
    marginHorizontal: wp(5),
    marginVertical: hp(15),
    marginBottom: hp(20),
  },
});

export default ResetPassword;
