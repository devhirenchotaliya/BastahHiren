//import liraries
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { fontFamily } from "../../helper/constants";
import { hp, wp } from "../../helper/globalFunctions";
import { colors } from "../../theme/Colors";
import { commonFontStyle } from "../../theme/Fonts";

const ProgressBar = ({ index }: { index: number }) => {
  const getContainerStyle = (currenIndex: number) => {
    return currenIndex === index
      ? styles.selectedContainerStyle
      : styles.unSelectedContainerStyle;
  };

  const getTextStyle = (currenIndex: number) => {
    return currenIndex === index
      ? styles.selectedTextStyle
      : styles.unSelectedTextStyle;
  };

  return (
    <View style={styles.container}>
      <View style={getContainerStyle(1)}>
        <Text style={getTextStyle(1)}>{1}</Text>
      </View>
      <Text style={styles.lineStyle}>{"---------"}</Text>
      <View style={getContainerStyle(2)}>
        <Text style={getTextStyle(2)}>{2}</Text>
      </View>
      <Text style={styles.lineStyle}>{"---------"}</Text>
      <View style={getContainerStyle(3)}>
        <Text style={getTextStyle(3)}>{3}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: hp(40),
    marginHorizontal: wp(16),
    alignItems: "center",
    alignSelf: "center",
  },
  selectedContainerStyle: {
    height: wp(46),
    width: wp(46),
    borderRadius: wp(46 / 2),
    backgroundColor: colors.grey,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedTextStyle: {
    ...commonFontStyle(fontFamily.medium, 21, colors.white),
  },
  unSelectedContainerStyle: {
    height: wp(46),
    width: wp(46),
    borderRadius: wp(46 / 2),
    backgroundColor: colors.grey13,
    justifyContent: "center",
    alignItems: "center",
  },
  unSelectedTextStyle: {
    ...commonFontStyle(fontFamily.medium, 21, colors.darkGrey2),
  },
  lineStyle: {
    ...commonFontStyle(fontFamily.regular, 15, colors.black),
    opacity: 0.15,
    marginHorizontal: wp(8),
  },
});

export default ProgressBar;
