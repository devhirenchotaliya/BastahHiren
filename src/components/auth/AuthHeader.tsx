//import liraries
import React from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { fontFamily } from "../../helper/constants";
import { hitSlop, hp, wp } from "../../helper/globalFunctions";
import { AuthHeaderProps } from "../../helper/types";
import { colors } from "../../theme/Colors";
import { commonFontStyle } from "../../theme/Fonts";
import { icons } from "../../theme/Icons";
import { useNavigation } from "@react-navigation/native";

const AuthHeader = ({
  title,
  borderBottomWidth = 0.5,
  onBackPressScreen,
  isHeartIcon,
  onPressHeart,
  icon,
  isHeartLoading,
  isClearIcon,
  onPressClearAll,
  onPressDelete,
  isDeleteIcon,
}: AuthHeaderProps) => {
  const { goBack } = useNavigation();

  const onBackPress = () => {
    if (onBackPressScreen) {
      onBackPressScreen();
    } else {
      goBack();
    }
  };
  return (
    <View style={{ ...styles.container, borderBottomWidth: borderBottomWidth }}>
      <TouchableOpacity hitSlop={hitSlop} onPress={onBackPress}>
        <Image
          source={icons.backArrow}
          resizeMode="contain"
          style={styles.iconStyle}
        />
      </TouchableOpacity>
      <Text style={styles.titleTextStyle}>{title}</Text>
      {isHeartIcon &&
        (isHeartLoading ? (
          <ActivityIndicator size={"small"} color={colors.primary} />
        ) : (
          <TouchableOpacity onPress={onPressHeart}>
            <Image
              // @ts-ignore
              source={icon}
              resizeMode="contain"
              style={styles.heartIconStyle}
            />
          </TouchableOpacity>
        ))}
      {isClearIcon && (
        <TouchableOpacity onPress={onPressClearAll} style={{}}>
          <Text style={styles.clearAlTextStyle}>{"Clear All"}</Text>
        </TouchableOpacity>
      )}
      {isDeleteIcon && (
        <TouchableOpacity onPress={onPressDelete}>
          <Image
            // @ts-ignore
            resizeMode="contain"
            source={icons.delete}
            style={styles.deleteIconStyle}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: hp(20),
    borderBottomWidth: 0.5,
    paddingHorizontal: wp(20),
    borderColor: colors.borderGreyLight,
    alignItems: "center",
  },
  iconStyle: {
    width: wp(15),
    height: hp(25),
    marginTop: hp(1.5),
  },
  titleTextStyle: {
    flex: 1,
    marginHorizontal: wp(25),
    ...commonFontStyle(fontFamily.semiBold, 22, colors.primary),
  },
  heartIconStyle: {
    height: wp(25),
    width: wp(25),
    marginTop: hp(1.7),
    tintColor: colors.primary,
  },
  clearAlTextStyle: {
    ...commonFontStyle(fontFamily.semiBold, 18, colors.grey),
  },
  deleteIconStyle: {
    height: wp(22),
    width: wp(22),
    marginTop: hp(1.7),
    tintColor: colors.primary,
  },
});

export default AuthHeader;
