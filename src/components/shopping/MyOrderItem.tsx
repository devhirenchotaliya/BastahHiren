import React, { useState } from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import { getStatusColor, hp, wp } from "../../helper/globalFunctions";
import { colors } from "../../theme/Colors";
import { commonFontStyle } from "../../theme/Fonts";
import { fontFamily } from "../../helper/constants";
import moment from "moment";
import { MyOrderItemProps } from "../../helper/types";

const MyOrderItem = ({ data, onPress }: MyOrderItemProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image
        resizeMode="cover"
        style={styles.imgStyle}
        source={{
          uri: data?.order_items?.[0]?.image,
        }}
      />
      <View style={styles.rightContainer}>
        <View style={{ flex: 1 }}>
          <Text style={styles.nameTextStyle}>
            {"Order ID: "}
            {data?.order_code}
          </Text>
          {/* <Text style={styles.sizeTextStyle}>{"Size: M"}</Text> */}
          {/* <Text style={styles.geryTextStyle}>{"Order ID: Bas542tah"}</Text> */}
          <Text style={styles.geryTextStyle}>
            {"Order Date: "}
            {moment(data?.created_at).format("ddd DD MMM YYYY")}
          </Text>
          <Text style={styles.amountTextStyle}>
            {"AED "}
            {data?.grand_total}
          </Text>
        </View>
        <View
          style={{
            ...styles.btnStyle,
            backgroundColor: getStatusColor(data?.status),
          }}
        >
          <Text style={styles.btnTextStyle}>{data?.status}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: wp(16),
    flexDirection: "row",
    borderBottomWidth: 0.5,
    paddingVertical: hp(26),
    borderBottomColor: colors.borderGreyLight,
  },
  imgStyle: {
    height: hp(180),
    width: wp(145),
    borderRadius: hp(10),
    backgroundColor: colors.inputBack,
  },
  rightContainer: {
    marginLeft: wp(17),
    flexDirection: "column",
    flex: 1,
  },
  nameTextStyle: {
    ...commonFontStyle(fontFamily.medium, 18, colors.primary),
  },
  sizeTextStyle: {
    ...commonFontStyle(fontFamily.regular, 17, colors.primary),
    marginVertical: hp(8),
  },
  amountTextStyle: {
    ...commonFontStyle(fontFamily.medium, 18, colors.primary),
  },
  geryTextStyle: {
    ...commonFontStyle(fontFamily.regular, 14, colors.grey11),
    marginVertical: hp(10),
  },
  btnStyle: {
    width: wp(111),
    height: hp(38),
    borderRadius: wp(5),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.grey,
  },
  btnTextStyle: {
    ...commonFontStyle(fontFamily.medium, 17, colors.white),
  },
});

export default MyOrderItem;
