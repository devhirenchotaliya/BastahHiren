//import liraries
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { fontFamily } from "../../helper/constants";
import { getText, hp, wp } from "../../helper/globalFunctions";
import { RowItemProps } from "../../helper/types";
import { colors } from "../../theme/Colors";
import { commonFontStyle } from "../../theme/Fonts";
import { string } from "../../i18n/locales/en";

const CartRowItem = ({
  title,
  value,
  font_family,
  textStyle,
}: RowItemProps) => {
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
        {title === "Total" ? (
          <Text style={styles.includedTextStyle}>
            {getText(string.cart.included_of_vat)}
          </Text>
        ) : null}
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
    marginTop: hp(18),
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: wp(22),
    justifyContent: "space-between",
  },
  totalContainer: {
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.borderGreyLight,
    borderTopColor: colors.borderGreyLight,
  },
  textStyle: {
    ...commonFontStyle(fontFamily.regular, 16, colors.grey6),
  },
  rowItemTitleTextStyle: {
    ...commonFontStyle(fontFamily.regular, 18, colors.primary),
  },
  includedTextStyle: {
    ...commonFontStyle(fontFamily.regular, 15, colors.grey15),
  },
});

export default CartRowItem;
