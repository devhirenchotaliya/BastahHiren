//import liraries
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { fontFamily } from "../../helper/constants";
import { hp, wp } from "../../helper/globalFunctions";
import { colors } from "../../theme/Colors";
import { commonFontStyle } from "../../theme/Fonts";
import { icons } from "../../theme/Icons";
import { OrderItemProps } from "../../helper/types";
import FastImage from "react-native-fast-image";

const OrderItem = ({ data }: OrderItemProps) => {
  let size = data?.options?.filter(
    (i: any) => Object.keys(i)?.[0] === "size"
  )?.[0]?.size;

  return (
    <View style={styles.container}>
      <FastImage
        resizeMode={FastImage.resizeMode.cover}
        style={styles.imgStyle}
        source={{
          uri: data?.image || data?.item?.images?.[0]?.image,
          priority: FastImage.priority.normal,
        }}
      />
      <View style={styles.rightContainer}>
        <Text
          numberOfLines={1}
          style={{ ...styles.nameTextStyle, fontFamily: fontFamily.semiBold }}
        >
          {data?.name || data?.item?.title}
        </Text>
        {size?.length > 0 ? (
          <Text style={styles.sizeTextStyle}>
            {"Size: "}
            {size}
          </Text>
        ) : (
          <Text style={styles.sizeTextStyle}></Text>
        )}
        <Text style={styles.nameTextStyle}>
          {"AED "}
          {data?.price || data?.item?.price}
        </Text>
        <Text
          numberOfLines={1}
          style={{ ...styles.sizeTextStyle, color: colors.grey }}
        >
          {"Sold by "}
          <Text style={{ color: colors.primary }}>
            {data?.seller?.store_name || data?.item?.seller?.store_name}
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    flexDirection: "row",
    paddingVertical: hp(25),
    paddingHorizontal: wp(20),
    borderBottomColor: colors.borderGreyLight,
  },
  imgStyle: {
    height: hp(115),
    width: wp(115),
    borderRadius: wp(10),
  },
  smallgreyTextStyle: {
    marginHorizontal: wp(15),
    ...commonFontStyle(fontFamily.extraLight, 14, colors.grey14),
  },
  rightContainer: {
    marginLeft: wp(20),
    flex: 1,
  },
  nameTextStyle: {
    ...commonFontStyle(fontFamily.medium, 18, colors.primary),
  },
  priceTextStyle: {
    ...commonFontStyle(fontFamily.medium, 17, colors.primary),
  },
  sizeTextStyle: {
    ...commonFontStyle(fontFamily.regular, 17, colors.primary),
    marginVertical: hp(10),
  },
});

export default OrderItem;
