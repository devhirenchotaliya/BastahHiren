//import liraries
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { fontFamily } from "../../helper/constants";
import { hp, wp } from "../../helper/globalFunctions";
import { CategoriesTypeProps, FashionItemProps } from "../../helper/types";
import { colors } from "../../theme/Colors";
import { commonFontStyle } from "../../theme/Fonts";

const FashionItem = ({ data, onPressItem }: FashionItemProps) => {
  return (
    <TouchableOpacity onPress={onPressItem} style={styles.container}>
      <Image
        resizeMode="cover"
        style={styles.imgStyle}
        source={{ uri: data.image }}
      />
      <Text numberOfLines={1} style={styles.nameTextStyle}>
        {data.name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp(105),
    marginRight: wp(11),
    marginVertical: hp(20),
  },
  imgStyle: {
    width: wp(105),
    height: hp(125),
    borderRadius: wp(5),
    backgroundColor: colors.inputBack,
  },
  nameTextStyle: {
    ...commonFontStyle(fontFamily.medium, 17, colors.primary),
    marginTop: hp(13),
    textAlign: "center",
  },
});

export default FashionItem;
