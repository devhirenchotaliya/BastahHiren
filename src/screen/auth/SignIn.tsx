import { useCallback, useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Input, PrimaryButton, SignInBtn } from "../../components";
import {
  hp,
  wp,
  isIos,
  getText,
  fontSize,
  infoToast,
  dispatchNavigation,
} from "../../helper/globalFunctions";
import { colors } from "../../theme/Colors";
import { icons } from "../../theme/Icons";
import { string } from "../../i18n/locales/en";
import { fontFamily, screenName } from "../../helper/constants";
import { commonFontStyle } from "../../theme/Fonts";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { RouterProps } from "../../helper/types";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { emailCheck } from "../../helper/validation";
import {
  userLogin,
  appleSignin,
  googleSignin,
  guestUserLogin,
} from "../../actions";
import { getAsyncFcmToken } from "../../helper/asyncStorage";
import {
  onAppleLogin,
  onGoogleLogin,
  formDataAppleLogin,
  formDataGoogleLogin,
  requestNotificationUserPermission,
} from "../../helper/firebaseConfig";
import { SafeAreaView } from "react-native-safe-area-context";
import { getUniqueId } from "react-native-device-info";

const SignIn = ({ navigation, route }: RouterProps) => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isShowPassword, setIsShowPassword] = useState<boolean>(true);

  useEffect(() => {
    requestNotificationUserPermission();
  }, []);

  const onGooglePress = async () => {
    onGoogleLogin(async (response) => {
      let data = await formDataGoogleLogin(response);
      const obj = {
        data,
        onSuccess: () => {
          dispatchNavigation(screenName.bottom_tab_navigator);
        },
        onFailure: () => {},
      };
      dispatch(googleSignin(obj));
    });
  };

  const onPressAppleLogin = async () => {
    await onAppleLogin()
      .then(async (response) => {
        let data = await formDataAppleLogin(response);
        const obj = {
          data,
          onSuccess: () => {
            dispatchNavigation(screenName.bottom_tab_navigator);
          },
          onFailure: () => {},
        };
        dispatch(appleSignin(obj));
      })
      .catch(() => {});
  };

  const onPressForgotPassword = () => {
    navigation.navigate(screenName.reset_password);
  };

  const onGuestNavigateTab = () => {
    if (route?.params?.isGuestCheckout) {
      // @ts-ignore
      navigation.replace(screenName.guest_checkout);
    } else {
      dispatchNavigation(screenName.bottom_tab_navigator);
    }
  };

  const onPressSignIn = async () => {
    let deviceToken = await getAsyncFcmToken();
    let uniqueId = await getUniqueId();
    if (email.trim().length === 0) {
      infoToast("Please enter your email address");
    } else if (!emailCheck(email)) {
      infoToast("Please enter your valid email address");
    } else if (password.trim().length === 0) {
      infoToast("Please enter your password");
    } else if (password.trim().length < 6) {
      infoToast("Your password must be at least 6 characters");
    } else {
      let data = new FormData();
      data.append("email", email);
      data.append("password", password);
      data.append("deviceToken", deviceToken || uniqueId);
      const obj = {
        data,
        onSuccess: () => {
          dispatchNavigation(screenName.bottom_tab_navigator);
        },
        onFailure: () => {},
      };
      dispatch(userLogin(obj));
    }
  };
  const onPressSignUp = () => navigation.navigate(screenName.sign_up);

  const onGuestLoginPress = async () => {
    let deviceToken = await getAsyncFcmToken();
    let uniqueId = await getUniqueId();
    let data = new FormData();
    data.append("deviceToken", deviceToken || uniqueId);
    const obj = {
      data,
      onSuccess: () => {
        onGuestNavigateTab();
      },
      onFailure: () => {},
    };
    dispatch(guestUserLogin(obj));
  };

  const onPressBack = () => navigation.goBack();

  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps={"handled"}
        contentContainerStyle={styles.contentContainerStyle}
      >
        {route?.params?.isGuestCheckout && (
          <TouchableOpacity
            onPress={onPressBack}
            style={styles.backIconContainer}
          >
            <Image
              resizeMode="contain"
              source={icons.backArrow}
              style={styles.backIconStyle}
            />
          </TouchableOpacity>
        )}
        <Text style={styles.signInText}>{getText(string.login.sign_in)}</Text>
        <SignInBtn
          iconName={icons.google}
          onBtnPress={onGooglePress}
          containerStyle={styles.googleBtn}
          title={getText(string.login.sign_in_with_google)}
        />
        <SignInBtn
          iconName={icons.facebook}
          onBtnPress={() => {}}
          containerStyle={styles.facebookBtn}
          titleStyle={styles.signInTextStyle}
          title={getText(string.login.sign_in_with_facbook)}
        />
        {isIos && (
          <SignInBtn
            iconName={icons.apple}
            onBtnPress={onPressAppleLogin}
            containerStyle={styles.appleBtn}
            titleStyle={styles.signInTextStyle}
            title={getText(string.login.sign_in_with_apple)}
          />
        )}

        <View style={{ height: hp(8) }} />
        <Input
          value={email}
          placeholder="williams@david.com"
          label={getText(string.login.email)}
          onChangeText={(t: string) => setEmail(t)}
        />
        <Input
          value={password}
          autoCorrect={false}
          isShowEyeIcon={true}
          placeholder="* * * * * * *"
          secureTextEntry={isShowPassword}
          label={getText(string.login.password)}
          onChangeText={(t: string) => setPassword(t)}
          onPressEye={() => setIsShowPassword(!isShowPassword)}
        />
        <Text
          onPress={onPressForgotPassword}
          style={styles.forgotPasswordTextStyle}
        >
          {getText(string.login.forgot_password)}
        </Text>
        <PrimaryButton
          onPress={onPressSignIn}
          label={getText(string.login.sign_in_button)}
        />
        <TouchableOpacity
          onPress={onGuestLoginPress}
          style={styles.guestUserContainer}
        >
          <Text style={{ ...styles.signUpTextStyle, fontSize: fontSize(18) }}>
            {getText(string.login.guest_login)}
          </Text>
        </TouchableOpacity>
        <Text onPress={onPressSignUp} style={styles.bottomTextStyle}>
          {getText(string.login.dont_have_account)}
          <Text style={styles.signUpTextStyle}>
            {getText(string.login.sign_up)}
          </Text>
        </Text>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentContainerStyle: {
    paddingHorizontal: wp(20),
  },
  signInText: {
    alignSelf: "center",
    marginTop: hp(50),
    marginBottom: hp(5),
    ...commonFontStyle(fontFamily.extraLight, 40, colors.primary),
  },
  googleBtn: {
    marginTop: hp(22),
    borderWidth: 1,
    borderColor: colors.borderGrey,
  },
  facebookBtn: {
    backgroundColor: colors.blue,
    marginVertical: hp(8),
  },
  appleBtn: {
    backgroundColor: colors.black,
  },
  signInTextStyle: {
    color: colors.white,
  },
  forgotPasswordTextStyle: {
    ...commonFontStyle(fontFamily.extraLight, 15, colors.placeholderTextColor),
    marginVertical: hp(15),
    alignSelf: "flex-start",
  },
  bottomTextStyle: {
    ...commonFontStyle(fontFamily.extraLight, 15, colors.placeholderTextColor),
    alignSelf: "center",
    marginVertical: hp(10),
  },
  signUpTextStyle: {
    ...commonFontStyle(fontFamily.regular, 15, colors.primary),
  },
  guestUserContainer: {
    alignSelf: "center",
  },
  backIconStyle: {
    height: wp(25),
    width: wp(25),
  },
  backIconContainer: {
    position: "absolute",
    left: wp(20),
    top: hp(10),
  },
});
