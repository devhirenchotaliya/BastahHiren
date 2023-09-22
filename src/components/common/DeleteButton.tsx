//import liraries
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { fontFamily } from "../../helper/constants";
import { hp } from "../../helper/globalFunctions";
import { PrimaryButtonProps } from "../../helper/types";
import { colors } from "../../theme/Colors";
import { commonFontStyle } from "../../theme/Fonts";

const DeleteButton = ({
  label,
  onPress,
  containerStyle,
}: PrimaryButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, containerStyle]}
    >
      <Text style={styles.labelTextStyle}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: hp(60),
    borderWidth: 2,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: hp(10),
    borderColor: colors.red,
    justifyContent: "center",
    backgroundColor: colors.white,
  },
  labelTextStyle: {
    textAlign: "center",
    ...commonFontStyle(fontFamily.medium, 17, colors.red),
  },
});

export default DeleteButton;
