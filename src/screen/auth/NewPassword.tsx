import React, { FC, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { colors } from "../../theme/Colors";
import { AuthHeader, Input, PrimaryButton } from "../../components";
import {
  dispatchNavigation,
  fontSize,
  getText,
  hp,
  wp,
} from "../../helper/globalFunctions";
import { string } from "../../i18n/locales/en";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { commonFontStyle } from "../../theme/Fonts";
import { fontFamily, screenName } from "../../helper/constants";

const NewPassword = () => {
  const [password, setPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");

  const onPressUpdatePassword = () => {
    dispatchNavigation(screenName.bottom_tab_navigator);
  };

  return (
    <SafeAreaView style={styles.container}>
      <AuthHeader
        borderBottomWidth={0}
        title={getText(string.new_password.create_new_password)}
      />
      <KeyboardAwareScrollView keyboardShouldPersistTaps={"handled"}>
        <View style={styles.bodyStyle}>
          <Text style={styles.infoTextStyle}>
            {string.new_password.create_new_password_info}
          </Text>
          <View style={{ height: hp(30) }} />
          <Input
            value={password}
            theme="second"
            placeholder="* * * * * * * *"
            label={getText(string.login.password)}
            onChangeText={(t: string) => setPassword(t)}
          />
          <View style={{ height: hp(10) }} />
          <Input
            value={newPassword}
            theme="second"
            placeholder="* * * * * * * *"
            onChangeText={(t: string) => setNewPassword(t)}
            label={getText(string.new_password.new_password)}
          />
          <Text style={styles.bothPasswordTextStyle}>
            {getText(string.new_password.both_passwords_must_match)}
          </Text>
          <View style={{ height: hp(40) }} />
          <PrimaryButton
            onPress={onPressUpdatePassword}
            label={getText(string.new_password.update_password)}
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
  bothPasswordTextStyle: {
    ...commonFontStyle(fontFamily.regular, 18, colors.black),
    opacity: 0.44,
    marginVertical: hp(20),
  },
});

export default NewPassword;
