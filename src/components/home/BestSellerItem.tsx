import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { hp, wp } from "../../helper/globalFunctions";
import { colors } from "../../theme/Colors";
import { commonFontStyle } from "../../theme/Fonts";
import { fontFamily } from "../../helper/constants";

const BestSellerItem = ({ data, onPressItem }: any) => {
  return (
    <TouchableOpacity onPress={onPressItem} style={styles.container}>
      <Image
        style={styles.imgStyle}
        resizeMode="cover"
        source={{
          uri: data?.images?.[0].image,
        }}
      />
      <Text numberOfLines={1} style={styles.nameTextStyle}>
        {data?.title}
      </Text>
      <Text style={styles.priceTextStyle}>
        {"AED "}
        {data?.price}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp(109),
    marginRight: wp(9),
  },
  imgStyle: {
    height: hp(129),
    width: wp(109),
    borderRadius: wp(10),
    backgroundColor: colors.inputBack,
  },
  nameTextStyle: {
    ...commonFontStyle(fontFamily.regular, 15, colors.primary),
    marginTop: hp(13),
    textAlign: "left",
  },
  priceTextStyle: {
    ...commonFontStyle(fontFamily.regular, 14, colors.priceGrey),
    marginVertical: hp(8),
    marginBottom: hp(15),
  },
});

export default BestSellerItem;
