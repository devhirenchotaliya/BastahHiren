import React, { useState } from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import { hp, wp } from "../../helper/globalFunctions";
import { colors } from "../../theme/Colors";
import { commonFontStyle } from "../../theme/Fonts";
import { fontFamily } from "../../helper/constants";
import { icons } from "../../theme/Icons";
import { AccountItemProps } from "../../helper/types";
import { accountList } from "../../helper/dummyData";

const AccountItem = ({ data, index, onPress }: AccountItemProps) => {
  return (
    <TouchableOpacity
      disabled={data.disabled}
      onPress={onPress}
      style={{
        ...styles.container,
        paddingTop: index === 0 ? hp(30) : hp(16),
        borderBottomWidth: accountList.length - 1 === index ? 0 : 0.5,
        paddingBottom: accountList.length - 1 === index ? hp(30) : hp(16),
      }}
    >
      <View style={styles.innerRowContainer}>
        <Image
          resizeMode="contain"
          source={data.icon}
          style={styles.iconStyle}
        />
        <Text style={styles.nameTextStyle}>{data?.label}</Text>
      </View>
      {!data?.isHideArrow && (
        <Image
          resizeMode="contain"
          source={icons.rightArrow}
          style={styles.arrowIconStyle}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 0.5,
    paddingVertical: hp(16),
    paddingHorizontal: wp(16),
    justifyContent: "space-between",
    borderBottomColor: colors.borderGreyLight,
  },
  innerRowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  nameTextStyle: {
    ...commonFontStyle(fontFamily.regular, 18, colors.primary),
    marginHorizontal: wp(20),
  },
  iconStyle: {
    height: hp(24),
    width: wp(24),
  },
  arrowIconStyle: {
    height: hp(16),
    width: wp(8),
  },
});

export default AccountItem;
