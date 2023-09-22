import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { RatingAndReviewsItemProps, SizeItemProps } from "../../helper/types";
import { fontSize, hp, wp } from "../../helper/globalFunctions";
import { colors } from "../../theme/Colors";
import { commonFontStyle } from "../../theme/Fonts";
import { fontFamily } from "../../helper/constants";

const RatingAndReviewsItem = ({ data }: RatingAndReviewsItemProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Image
          resizeMode="cover"
          source={{
            uri: data?.user?.picture,
          }}
          style={styles.imgStyle}
        />
        <View style={styles.nameContainer}>
          <Text style={styles.nameTextStyle}>{data?.user?.name}</Text>
          <Text style={styles.dateTextStyle}>{data?.created_at}</Text>
        </View>
      </View>
      <Text style={styles.descTextStyle}>{data?.comments}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: hp(15),
  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  imgStyle: {
    height: hp(50),
    width: hp(50),
    borderRadius: hp(50 / 2),
    backgroundColor: colors.inputBack,
  },
  nameContainer: {
    flex: 1,
    marginLeft: wp(15),
  },
  nameTextStyle: {
    ...commonFontStyle(fontFamily.regular, 15, colors.primary),
  },
  dateTextStyle: {
    ...commonFontStyle(fontFamily.regular, 13, colors.grey5),
    marginTop: hp(5),
  },
  descTextStyle: {
    ...commonFontStyle(fontFamily.regular, 13, colors.grey5),
    lineHeight: fontSize(22),
    marginTop: hp(15),
  },
});

export default RatingAndReviewsItem;
