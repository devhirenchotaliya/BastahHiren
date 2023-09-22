import React, { useCallback } from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../../theme/Colors";
import { commonFontStyle } from "../../theme/Fonts";
import { fontFamily } from "../../helper/constants";
import { hp, wp } from "../../helper/globalFunctions";
import { RowItemProps } from "../../helper/types";

const RowItem = ({ title, value, font_family, textStyle }: RowItemProps) => {
  return (
    <View style={styles.rowItemContainer}>
      <Text
        style={{
          ...styles.rowItemTitleTextStyle,
          fontFamily: font_family || fontFamily.regular,
          ...textStyle,
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          ...styles.rowItemTitleTextStyle,
          fontFamily: font_family || fontFamily.regular,
          ...textStyle,
        }}
      >
        {value}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  rowItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: wp(18),
    marginBottom: hp(15),
  },
  rowItemTitleTextStyle: {
    ...commonFontStyle(fontFamily.regular, 18, colors.primary),
  },
});

export default RowItem;
