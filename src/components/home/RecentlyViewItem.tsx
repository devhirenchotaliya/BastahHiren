import React, { useState } from "react";
import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { hp, wp } from "../../helper/globalFunctions";
import { colors } from "../../theme/Colors";
import { commonFontStyle } from "../../theme/Fonts";
import { fontFamily } from "../../helper/constants";
import { RecentlyViewItemProps } from "../../helper/types";
import { icons } from "../../theme/Icons";
import { getItemDetails } from "../../actions";
import { useAppDispatch } from "../../redux/hooks";

const RecentlyViewItem = ({
  data,
  containerStyle,
  isShowHeart,
  isHeartLoading,
  onPressHeart,
  onPressScreenItem,
  currentItem,
}: RecentlyViewItemProps) => {
  const dispatch = useAppDispatch();

  const onPressItem = () => {
    let params = { item_id: data?.id };
    dispatch(getItemDetails(params));
  };

  return (
    <TouchableOpacity
      onPress={() => {
        if (onPressScreenItem) {
          onPressScreenItem();
        } else {
          onPressItem();
        }
      }}
      style={{ ...styles.container, ...containerStyle }}
    >
      {isShowHeart && (
        <View style={styles.heartContainer}>
          {isHeartLoading && currentItem === data.id ? (
            <ActivityIndicator size={"small"} color={colors.primary} />
          ) : (
            <TouchableOpacity onPress={onPressHeart}>
              <Image
                resizeMode="contain"
                style={styles.heartIconStyle}
                source={
                  data?.is_favourite === 1 ? icons.heartSelected : icons.heart
                }
              />
            </TouchableOpacity>
          )}
        </View>
      )}
      <Image
        style={styles.imgStyle}
        resizeMode="cover"
        source={{
          uri: data?.images?.[0]?.image,
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
    width: wp(165),
    marginBottom: hp(5),
  },
  imgStyle: {
    height: hp(217),
    width: wp(165),
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
  heartIconStyle: {
    height: hp(24),
    width: wp(24),
  },
  heartContainer: {
    zIndex: 1,
    top: hp(10),
    right: wp(10),
    position: "absolute",
  },
});

export default RecentlyViewItem;
