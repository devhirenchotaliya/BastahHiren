//import liraries
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { fontFamily } from "../../helper/constants";
import { hp, wp } from "../../helper/globalFunctions";
import { PrimaryButtonProps } from "../../helper/types";
import { colors } from "../../theme/Colors";
import { commonFontStyle } from "../../theme/Fonts";
import { icons } from "../../theme/Icons";

const PrimaryButton = ({
  label,
  onPress,
  containerStyle,
  isAddIconShow,
}: PrimaryButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, containerStyle]}
    >
      {isAddIconShow && (
        <View style={styles.addIconContainer}>
          <Image
            resizeMode="contain"
            style={styles.addIconStyle}
            source={icons.plus}
          />
        </View>
      )}

      <Text style={styles.labelTextStyle}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: hp(60),
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
    marginVertical: hp(15),
    justifyContent: "center",
    backgroundColor: colors.secondaryPrimary,
  },
  labelTextStyle: {
    textAlign: "center",
    ...commonFontStyle(fontFamily.medium, 20, colors.white),
  },
  addIconStyle: {
    height: wp(15),
    width: wp(15),
  },
  addIconContainer: {
    height: wp(33),
    width: wp(33),
    alignItems: "center",
    marginLeft: -wp(20),
    marginRight: wp(20),
    borderRadius: wp(33 / 2),
    justifyContent: "center",
    backgroundColor: colors.white,
  },
});

export default PrimaryButton;
