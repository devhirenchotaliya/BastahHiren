//import liraries
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { fontFamily } from "../../helper/constants";
import { fontSize, getText, hp, wp } from "../../helper/globalFunctions";
import { colors } from "../../theme/Colors";
import { commonFontStyle } from "../../theme/Fonts";
import ReactNativeModal from "react-native-modal";
import { icons } from "../../theme/Icons";
import { LogoutModalProps, RemoveModalProps } from "../../helper/types";

const LogoutModal = ({
  isVisible,
  title,
  question,
  onPressNo,
  onPressYes,
  source,
  iconStyle,
}: LogoutModalProps) => {
  return (
    <ReactNativeModal isVisible={isVisible}>
      <View style={styles.container}>
        <Image
          source={source}
          resizeMode="contain"
          style={{ ...styles.removeIconStyle, ...iconStyle }}
        />
        <Text style={styles.titleTextStyle}>{title}</Text>
        <Text style={styles.subTitleTextStyle}>{question}</Text>
        <View style={styles.rowStyle}>
          <TouchableOpacity onPress={onPressNo} style={styles.buttonStyle}>
            <Text style={styles.buttonTitleStyle}>{"No"}</Text>
          </TouchableOpacity>
          <View style={{ width: wp(12) }} />
          <TouchableOpacity onPress={onPressYes} style={styles.buttonStyle}>
            <Text
              style={{
                ...styles.buttonTitleStyle,
                color: colors.red,
              }}
            >
              {"Yes"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ReactNativeModal>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: wp(14),
    borderRadius: 25,
    paddingVertical: hp(25),
    backgroundColor: colors.white,
  },
  removeIconStyle: {
    height: wp(90),
    width: wp(60),
    alignSelf: "center",
  },
  titleTextStyle: {
    textAlign: "center",
    ...commonFontStyle(fontFamily.bold, 20, colors.primary),
    marginTop: hp(15),
  },
  subTitleTextStyle: {
    textAlign: "center",
    ...commonFontStyle(fontFamily.regular, 16, colors.grey17),
    marginVertical: hp(10),
    lineHeight: fontSize(27),
    marginBottom: hp(30),
  },
  rowStyle: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonStyle: {
    flex: 1,
    height: hp(60),
    borderRadius: wp(10),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.grey20,
  },
  buttonTitleStyle: {
    ...commonFontStyle(fontFamily.semiBold, 17, colors.primary),
  },
});

export default LogoutModal;
