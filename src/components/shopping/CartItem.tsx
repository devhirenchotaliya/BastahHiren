import React, { useState } from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import { hitSlop, hp, wp } from "../../helper/globalFunctions";
import { colors } from "../../theme/Colors";
import { commonFontStyle } from "../../theme/Fonts";
import { fontFamily } from "../../helper/constants";
import QuantityManager from "../details/QuantityManager";
import FastImage from "react-native-fast-image";
import { CartItemProps } from "../../helper/types";
import { icons } from "../../theme/Icons";

const CartItem = ({
  data,
  onUpdateQuantity,
  itemContainer,
  onPressRemoveItem,
}: CartItemProps) => {
  let size = data?.options?.filter(
    (i: any) => Object.keys(i)?.[0] === "size"
  )?.[0]?.size;

  return (
    <View style={[styles.container, itemContainer]}>
      <FastImage
        resizeMode={FastImage.resizeMode.cover}
        style={styles.imgStyle}
        source={{
          uri: data?.item.images?.[0]?.image,
          priority: FastImage.priority.normal,
        }}
      />
      <View style={styles.rightContainer}>
        <Text style={styles.nameTextStyle}>{data?.item?.title}</Text>
        {size?.length ? (
          <Text style={styles.sizeTextStyle}>
            {"Size: "}
            {size || ""}
          </Text>
        ) : (
          <Text style={styles.sizeTextStyle}></Text>
        )}

        <View style={{ marginVertical: hp(10) }}>
          <QuantityManager
            quantity={data?.quantity}
            setQuantity={onUpdateQuantity}
          />
        </View>
        <View style={styles.rowStyle}>
          <Text style={styles.amountTextStyle}>
            {"AED "}
            {data?.item?.price}
          </Text>
          <TouchableOpacity onPress={onPressRemoveItem} hitSlop={hitSlop}>
            <Image
              resizeMode="contain"
              source={icons.delete}
              style={styles.deleteIconStyle}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: wp(16),
    paddingVertical: hp(26),
    flexDirection: "row",
    borderBottomWidth: 0.5,
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
    flex: 1,
  },
  nameTextStyle: {
    ...commonFontStyle(fontFamily.medium, 18, colors.primary),
  },
  sizeTextStyle: {
    ...commonFontStyle(fontFamily.regular, 16, colors.primary),
    marginVertical: hp(15),
  },
  amountTextStyle: {
    ...commonFontStyle(fontFamily.medium, 18, colors.primary),
    flex: 1,
  },
  rowStyle: {
    flexDirection: "row",
    alignItems: "center",
  },
  deleteIconStyle: {
    height: wp(18),
    width: wp(18),
    tintColor: colors.primary,
  },
});

export default CartItem;
