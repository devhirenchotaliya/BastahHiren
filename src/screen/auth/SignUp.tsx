import { FC, useRef, useState } from "react";
import {
  Image,
  Keyboard,
  LayoutAnimation,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { CheckBox, Input, PrimaryButton, SignInBtn } from "../../components";
import { fontFamily, screenName } from "../../helper/constants";
import {
  dispatchNavigation,
  getText,
  hp,
  infoToast,
  isIos,
  wp,
} from "../../helper/globalFunctions";
import { string } from "../../i18n/locales/en";
import { colors } from "../../theme/Colors";
import { commonFontStyle } from "../../theme/Fonts";
import { icons } from "../../theme/Icons";
import { RouterProps } from "../../helper/types";
import { emailCheck, nameCheck, passwordCheck } from "../../helper/validation";
import { appleSignin, googleSignin, userRegister } from "../../actions";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getAsyncFcmToken } from "../../helper/asyncStorage";
import {
  formDataAppleLogin,
  formDataGoogleLogin,
  onAppleLogin,
  onGoogleLogin,
} from "../../helper/firebaseConfig";
import { getUniqueId } from "react-native-device-info";

const SignUp = ({ navigation }: RouterProps) => {
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isCheck, setIsCheck] = useState<boolean>(false);
  const [isShowPassword, setIsShowPassword] = useState<boolean>(true);

  const fullNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const onPressForgotPassword = () => {};

  const onPressSignIn = async () => {
    let deviceToken = await getAsyncFcmToken();
    let uniqueId = await getUniqueId();
    if (fullName.trim().length === 0) {
      infoToast("Please enter your full name");
    } else if (!nameCheck(fullName)) {
      infoToast("Please enter your proper full name");
    } else if (email.trim().length === 0) {
      infoToast("Please enter your email address");
    } else if (!emailCheck(email)) {
      infoToast("Please enter your valid email address");
    } else if (password.trim().length === 0) {
      infoToast("Please enter your password");
    } else if (!passwordCheck(password)) {
      infoToast(getText(string.sign_up.strong_password_text));
    } else if (isCheck === false) {
      infoToast("Please allow our Terms & Conditions");
    } else {
      let data = new FormData();
      data.append("name", fullName);
      data.append("email", email);
      data.append("password", password);
      data.append("deviceToken", deviceToken || uniqueId);
      const obj = {
        data,
        onSuccess: (res: any) => {
          navigation.navigate(screenName.phone_verification, {
            user_id: res?.data?.user?.id,
          });
        },
        onFailure: () => {},
      };
      dispatch(userRegister(obj));
    }
  };

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

  const onPressCheckBox = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsCheck(!isCheck);
  };

  const onPressBack = () => navigation.goBack();

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps={"handled"}
        contentContainerStyle={styles.contentContainerStyle}
      >
        <View style={styles.rowStyle}>
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
          <Text style={styles.signInText}>{getText(string.login.sign_up)}</Text>
        </View>
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

        <View style={{ height: hp(5) }} />
        <Input
          value={fullName}
          returnKeyType="next"
          inputRef={fullNameRef}
          placeholder="williams david"
          label={getText(string.sign_up.full_name)}
          onChangeText={(t: string) => setFullName(t)}
          onSubmitEditing={() => emailRef?.current.focus()}
        />
        <Input
          value={email}
          returnKeyType="next"
          inputRef={emailRef}
          placeholder="williams@david.com"
          label={getText(string.login.email)}
          onChangeText={(t: string) => setEmail(t)}
          onSubmitEditing={() => passwordRef?.current.focus()}
        />
        <Input
          value={password}
          returnKeyType="done"
          isShowEyeIcon={true}
          inputRef={passwordRef}
          placeholder="* * * * * * *"
          secureTextEntry={isShowPassword}
          label={getText(string.login.password)}
          onSubmitEditing={() => Keyboard.dismiss()}
          onChangeText={(t: string) => setPassword(t)}
          onPressEye={() => setIsShowPassword(!isShowPassword)}
        />
        {password?.length && !passwordCheck(password) ? (
          <Text
            onPress={onPressForgotPassword}
            style={styles.forgotPasswordTextStyle}
          >
            {getText(string.sign_up.strong_password_text)}
          </Text>
        ) : (
          <Text
            onPress={onPressForgotPassword}
            style={styles.forgotPasswordTextStyle}
          ></Text>
        )}

        <View style={styles.checkBoxContainer}>
          <CheckBox isValue={isCheck} onPress={onPressCheckBox} />
          <Text onPress={onPressForgotPassword} style={styles.termsTextStyle}>
            {getText(string.sign_up.terms_text)}
          </Text>
        </View>
        <PrimaryButton
          onPress={onPressSignIn}
          label={getText(string.login.sign_up)}
        />
      </KeyboardAwareScrollView>
    </View>
  );
};
export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentContainerStyle: {
    paddingHorizontal: wp(20),
  },
  signInText: {
    textAlign: "center",
    marginTop: hp(35),
    marginBottom: hp(5),
    ...commonFontStyle(fontFamily.extraLight, 40, colors.primary),
    textTransform: "uppercase",
    flex: 1,
  },
  googleBtn: {
    marginTop: hp(10),
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
    ...commonFontStyle(fontFamily.regular, 15, colors.red),
    marginVertical: hp(8),
  },
  checkBoxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: hp(7),
  },
  termsTextStyle: {
    ...commonFontStyle(fontFamily.extraLight, 14, colors.placeholderTextColor),
    marginLeft: wp(8),
    flex: 1,
  },
  backIconStyle: {
    height: wp(25),
    width: wp(25),
  },
  backIconContainer: {
    position: "absolute",
    bottom: hp(15),
    zIndex: 1,
  },
  rowStyle: {
    flexDirection: "row",
    alignItems: "center",
  },
});
