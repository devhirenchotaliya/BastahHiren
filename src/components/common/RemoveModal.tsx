//import liraries
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { fontFamily } from "../../helper/constants";
import { fontSize, getText, hp, wp } from "../../helper/globalFunctions";
import { colors } from "../../theme/Colors";
import { commonFontStyle } from "../../theme/Fonts";
import { string } from "../../i18n/locales/en";
import ReactNativeModal from "react-native-modal";
import { icons } from "../../theme/Icons";
import { RemoveModalProps } from "../../helper/types";

const RemoveModal = ({
  isVisible,
  title,
  question,
  onPressCancel,
  onPressYes,
}: RemoveModalProps) => {
  return (
    <ReactNativeModal
      isVisible={isVisible}
      onBackdropPress={onPressCancel}
      onBackButtonPress={onPressCancel}
    >
      <View style={styles.container}>
        <Image
          style={styles.removeIconStyle}
          source={icons.remove}
          resizeMode="contain"
        />
        <Text style={styles.titleTextStyle}>{title}</Text>
        <Text style={styles.subTitleTextStyle}>{question}</Text>
        <View style={styles.rowStyle}>
          <TouchableOpacity onPress={onPressCancel} style={styles.buttonStyle}>
            <Text style={styles.buttonTitleStyle}>{"Cancel"}</Text>
          </TouchableOpacity>
          <View style={{ width: wp(12) }} />
          <TouchableOpacity onPress={onPressYes} style={styles.buttonStyle}>
            <Text style={styles.buttonTitleStyle}>{"Yes"}</Text>
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
    marginHorizontal: wp(18),
    backgroundColor: colors.white,
  },
  removeIconStyle: {
    height: wp(90),
    width: wp(60),
    alignSelf: "center",
  },
  titleTextStyle: {
    textAlign: "center",
    ...commonFontStyle(fontFamily.semiBold, 20, colors.primary),
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
    ...commonFontStyle(fontFamily.medium, 17, colors.primary),
  },
});

export default RemoveModal;
