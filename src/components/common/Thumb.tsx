//import liraries
import React, { memo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { fontFamily } from "../../helper/constants";
import { hp, wp } from "../../helper/globalFunctions";
import { ThumbProps } from "../../helper/types";
import { colors } from "../../theme/Colors";
import { commonFontStyle } from "../../theme/Fonts";

const Thumb = ({ name, low, high }: ThumbProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.circleStyle}></View>
      <Text
        style={
          name === "low" ? styles.lowPriceTextStyle : styles.highPriceTextStyle
        }
      >
        {"AED "} {name === "low" ? low : high}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: -hp(32),
  },
  circleStyle: {
    height: hp(25),
    width: wp(25),
    borderWidth: wp(4),
    borderRadius: wp(25 / 2),
    borderColor: colors.grey,
    backgroundColor: colors.white,
  },
  highPriceTextStyle: {
    ...commonFontStyle(fontFamily.medium, 15, colors.primary),
    marginVertical: hp(8),
  },
  lowPriceTextStyle: {
    ...commonFontStyle(fontFamily.medium, 15, colors.grey8),
    marginVertical: hp(8),
  },
});

export default memo(Thumb);
