import React, { useState } from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import { fontSize, hitSlop, hp, wp } from "../../helper/globalFunctions";
import { colors } from "../../theme/Colors";
import { commonFontStyle } from "../../theme/Fonts";
import { fontFamily } from "../../helper/constants";
import { icons } from "../../theme/Icons";
import { CardItemProps } from "../../helper/types";

const CardItem = ({ data }: CardItemProps) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.rowStyle}>
        <Image
          source={icons.visa}
          resizeMode="contain"
          style={styles.iconStyle}
        />
        <View style={styles.nameContainer}>
          <Text style={styles.cardNoTextStyle}>
            {"* * * * "}
            {data?.card?.last4}
          </Text>
          <Text style={styles.cardTypeTextStyle}>{data?.card?.brand}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: wp(20),
    padding: wp(16),
    paddingVertical: wp(20),
    marginTop: hp(30),
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 3,
    backgroundColor: colors.white,
    borderRadius: wp(10),
    flexDirection: "row",
    alignItems: "center",
  },
  iconStyle: {
    height: wp(45),
    width: wp(45),
  },
  rowStyle: {
    flexDirection: "row",
    alignItems: "center",
  },
  nameContainer: {
    flex: 1,
    marginHorizontal: wp(16),
  },
  cardNoTextStyle: {
    ...commonFontStyle(fontFamily.regular, 20, colors.black3),
  },
  cardTypeTextStyle: {
    ...commonFontStyle(fontFamily.regular, 18, colors.placeholderTextColor),
    lineHeight: fontSize(30),
  },
});

export default CardItem;
