import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { hp, wp } from "../../helper/globalFunctions";
import { colors } from "../../theme/Colors";
import { commonFontStyle } from "../../theme/Fonts";
import { fontFamily } from "../../helper/constants";
import { CategoriesItemProps } from "../../helper/types";
import FastImage from "react-native-fast-image";

const CategoriesItem = ({
  data,
  containerStyle,
  imgStyle,
  onItemPress,
  nameTextStyle,
}: CategoriesItemProps) => {
  const [isImgLoading, setIsImgLoading] = useState<boolean>(true);
  return (
    <TouchableOpacity
      onPress={onItemPress}
      style={{ ...styles.container, ...containerStyle }}
    >
      <FastImage
        onLoadStart={() => setIsImgLoading(true)}
        onLoadEnd={() => setIsImgLoading(false)}
        resizeMode={FastImage.resizeMode.cover}
        // @ts-ignore
        style={{ ...styles.imgStyle, ...imgStyle }}
        source={{ uri: data.image, priority: FastImage.priority.normal }}
      >
        {isImgLoading && (
          <ActivityIndicator size={"small"} color={colors.grey} />
        )}
      </FastImage>
      <Text
        numberOfLines={2}
        style={{ ...styles.nameTextStyle, ...nameTextStyle }}
      >
        {data.name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp(87),
    marginRight: wp(40),
    alignItems: "center",
  },
  imgStyle: {
    width: wp(87),
    height: wp(87),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: wp(87 / 2),
    backgroundColor: colors.inputBack,
  },
  nameTextStyle: {
    ...commonFontStyle(fontFamily.regular, 12, colors.primary),
    marginVertical: hp(8),
    textAlign: "center",
    marginHorizontal: wp(4),
  },
});

export default CategoriesItem;
