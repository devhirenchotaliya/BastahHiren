//import liraries
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { fontFamily, screenName } from "../../helper/constants";
import { fontSize, hp, wp } from "../../helper/globalFunctions";
import { BusinessesItemProps } from "../../helper/types";
import { colors } from "../../theme/Colors";
import { commonFontStyle } from "../../theme/Fonts";
import { icons } from "../../theme/Icons";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch } from "../../redux/hooks";
import { clearSellerProfile } from "../../actions";
import FastImage from "react-native-fast-image";

const BusinessesItem = ({
  avgRate,
  totalRate,
  description,
  image,
  name,
  onStarPress,
  containerStyle,
  seller_id,
  disabled,
}: BusinessesItemProps) => {
  const { navigate } = useNavigation();
  const dispatch = useAppDispatch();

  const onItemPress = () => {
    dispatch(clearSellerProfile());
    //@ts-ignore
    navigate(screenName.seller_profile, { seller_id: seller_id });
  };

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onItemPress}
      style={{ ...styles.container, ...containerStyle }}
    >
      <View style={styles.innerContainer}>
        <View style={{ ...styles.rowStyle, flex: 1 }}>
          <FastImage
            resizeMode="cover"
            source={{
              uri: image,
              priority: FastImage.priority.normal,
            }}
            style={styles.imgStyle}
          />
          <Text numberOfLines={2} style={styles.nameTextStyle}>
            {name}
          </Text>
        </View>
        <TouchableOpacity
          disabled={true}
          onPress={onStarPress}
          style={styles.rowStyle}
        >
          <Image
            resizeMode="contain"
            source={icons.star}
            style={styles.starIconStyle}
          />
          <Text style={styles.starCountTextStyle}>{avgRate}</Text>
          <Text style={styles.amountTextStyle}>{`(${totalRate || 0})`}</Text>
        </TouchableOpacity>
      </View>
      <Text numberOfLines={2} style={styles.descTextStyle}>
        {description}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: wp(16),
    borderTopWidth: 0.5,
    paddingVertical: hp(20),
    borderTopColor: colors.borderGrey,
  },
  innerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowStyle: {
    flexDirection: "row",
    alignItems: "center",
  },
  imgStyle: {
    width: wp(57),
    height: hp(57),
    borderRadius: wp(57 / 2),
    backgroundColor: colors.inputBack,
  },
  nameTextStyle: {
    marginHorizontal: wp(13),
    ...commonFontStyle(fontFamily.medium, 17, colors.primary),
    flex: 1,
  },
  starIconStyle: {
    height: hp(21),
    width: wp(21),
  },
  starCountTextStyle: {
    marginLeft: wp(7),
    marginHorizontal: wp(5),
    ...commonFontStyle(fontFamily.medium, 17, colors.primary),
  },
  amountTextStyle: {
    ...commonFontStyle(fontFamily.regular, 17, colors.grey),
  },
  descTextStyle: {
    marginTop: hp(15),
    lineHeight: fontSize(25),
    ...commonFontStyle(fontFamily.regular, 16, colors.grey9),
  },
});

export default BusinessesItem;
