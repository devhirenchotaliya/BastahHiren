//import liraries
import React from "react";
import { Image, Platform, StyleSheet, Text, View } from "react-native";

import { fontFamily } from "../../helper/constants";
import { hp, screen_width, wp } from "../../helper/globalFunctions";
import { colors } from "../../theme/Colors";
import { commonFontStyle } from "../../theme/Fonts";
import Toast, { ToastType } from "react-native-toast-message";
import DropShadow from "react-native-drop-shadow";
import { icons } from "../../theme/Icons";

const ToastMsg = React.forwardRef((props, ref) => {
  const toastConfig = {
    success: ({ text1, text2, type, props, ...rest }: any) =>
      type === "success" && (
        <DropShadow style={styles.dropShadowSuccessStyle}>
          <View
            style={{
              ...styles.toastStyle,
              backgroundColor: colors.green2,
            }}
          >
            <Image
              source={icons.appLogo}
              resizeMode="contain"
              style={styles.iconStyle}
            />
            <Text style={{ ...styles.textStyleToast, color: colors.white }}>
              {text1?.toString()}
            </Text>
          </View>
        </DropShadow>
      ),
    error: ({ text1, text2, type, props, ...rest }: any) =>
      type === "error" && (
        <DropShadow style={styles.dropShadowErrorStyle}>
          <View style={styles.toastStyle}>
            <Image
              source={icons.appLogo}
              resizeMode="contain"
              style={styles.iconStyle}
            />
            <Text style={styles.textStyleToast}>{text1?.toString()}</Text>
            {/* <Text style={styles.textStyleToast}>{text2}</Text> */}
          </View>
        </DropShadow>
      ),
    info: ({ text1, text2, type, props, ...rest }: any) =>
      type === "info" && (
        <DropShadow style={styles.dropShadowInfoStyle}>
          <View style={styles.toastStyle}>
            <Image
              source={icons.appLogo}
              resizeMode="contain"
              style={styles.iconStyle}
            />
            <Text style={styles.textStyleToast}>{text1?.toString()}</Text>
            {/* <Text style={styles.textStyleToast}>{text2}</Text> */}
          </View>
        </DropShadow>
      ),
    otp_success: ({ text1, text2, type, props, ...rest }: any) =>
      type === "otp_success" && (
        <DropShadow
          style={{ ...styles.dropShadowInfoStyle, shadowColor: colors.green }}
        >
          <View style={{ ...styles.toastStyle, backgroundColor: colors.green }}>
            <Text style={{ ...styles.textStyleToast, color: colors.white }}>
              {text1?.toString()}
            </Text>
          </View>
        </DropShadow>
      ),
  };
  return (
    <Toast
      {...props}
      position={"bottom"}
      bottomOffset={hp(115)}
      config={toastConfig}
      visibilityTime={2000}
      // @ts-ignore
      ref={(ref: any) => Toast.setRef(ref)}
    />
  );
});

const styles = StyleSheet.create({
  toastStyle: {
    backgroundColor: colors.white,
    paddingVertical: hp(10),
    paddingHorizontal: wp(22),
    maxWidth: screen_width - hp(30),
    borderRadius: wp(10),
    borderColor: colors.green,
    borderLeftColor: colors.green,
    flexDirection: "row",
    flex: 1,
  },
  textStyleToast: {
    ...commonFontStyle(fontFamily.regular, 18, colors.black),
    marginRight: wp(5),
  },
  dropShadowSuccessStyle: {
    shadowColor: colors.green2,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  dropShadowErrorStyle: {
    shadowColor: colors.red,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: Platform.OS === "ios" ? 1 : 0.5,
    shadowRadius: 5,
  },
  dropShadowInfoStyle: {
    shadowColor: colors.grey,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  iconStyle: {
    height: wp(22),
    width: wp(22),
    marginRight: wp(10),
    marginLeft: wp(-10),
  },
});

export default ToastMsg;
