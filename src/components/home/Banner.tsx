import React from "react";
import { StyleSheet, Pressable } from "react-native";

import { colors } from "../../theme/Colors";
import { BannerItemProps } from "../../helper/types";
import { hp, wp } from "../../helper/globalFunctions";
import FastImage from "react-native-fast-image";

type bannerItem = {
  data: BannerItemProps;
};

const Banner = ({ data }: bannerItem) => {
  return (
    <Pressable style={styles.container}>
      <FastImage
        style={styles.bannerStyle}
        source={{
          uri: data.image,
          priority: FastImage.priority.high,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp(345),
    height: hp(195),
    alignSelf: "center",
    borderRadius: wp(20),
    marginVertical: hp(20),
    marginHorizontal: wp(16),
    backgroundColor: colors.inputBack,
  },
  bannerStyle: {
    width: wp(345),
    height: hp(195),
    borderRadius: wp(10),
    backgroundColor: colors.inputBack,
  },
});

export default Banner;
