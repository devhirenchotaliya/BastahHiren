import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { getText, hp, wp } from "../../helper/globalFunctions";
import { HomeHeaderProps } from "../../helper/types";
import { string } from "../../i18n/locales/en";
import { commonFontStyle } from "../../theme/Fonts";
import { fontFamily, screenName } from "../../helper/constants";
import { colors } from "../../theme/Colors";
import { icons } from "../../theme/Icons";
import FastImage from "react-native-fast-image";
import { useNavigation } from "@react-navigation/native";
import { useAppSelector } from "../../redux/hooks";

const HomeHeader = ({
  profileIcon,
  onCartPress,
  userName,
  isGuest,
}: HomeHeaderProps) => {
  const { navigate } = useNavigation();
  const { cartCount } = useAppSelector((state) => state.shopping);

  const onPressNotification = () => {
    //@ts-ignore
    navigate(screenName.notification);
  };
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <FastImage
          resizeMode={FastImage.resizeMode.cover}
          style={styles.profileStyle}
          source={{ uri: profileIcon, priority: FastImage.priority.high }}
        />

        <View style={styles.nameContainer}>
          <Text style={styles.nameTextStyle}>
            {getText(string.home.welcome)}
          </Text>
          <Text style={styles.locationTextStyle}>
            {"to "}
            {userName}
          </Text>
        </View>
      </View>
      <View style={styles.secondContainer}>
        {isGuest ? null : (
          <TouchableOpacity onPress={onPressNotification}>
            <Image
              resizeMode="contain"
              source={icons.notifiaction}
              style={styles.notifiactionIconStyle}
            />
            <View style={styles.countStyle}>
              <Text style={styles.countTextStyle}>{"5"}</Text>
            </View>
          </TouchableOpacity>
        )}

        <View style={{ width: wp(15) }} />
        <TouchableOpacity onPress={onCartPress}>
          <Image
            resizeMode="contain"
            source={icons.cart}
            style={styles.notifiactionIconStyle}
          />
          {cartCount > 0 ? (
            <View
              style={{
                ...styles.countStyle,
                right: wp(-2),
                top: wp(-3),
              }}
            >
              <Text style={styles.countTextStyle}>{cartCount}</Text>
            </View>
          ) : null}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: wp(16),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  innerContainer: {
    flexDirection: "row",
    flex: 1,
  },
  profileStyle: {
    height: wp(45),
    width: wp(45),
    borderRadius: wp(45 / 2),
    backgroundColor: colors.inputBack,
  },
  nameContainer: {
    marginHorizontal: wp(13),
    flex: 1,
  },
  nameTextStyle: {
    ...commonFontStyle(fontFamily.regular, 21, colors.primary),
  },
  locationTextStyle: {
    ...commonFontStyle(fontFamily.regular, 14, colors.grey2),
    marginTop: hp(2),
  },
  notifiactionIconStyle: {
    height: hp(27),
    width: wp(25),
  },
  countStyle: {
    height: wp(13),
    width: wp(13),
    backgroundColor: colors.brown,
    position: "absolute",
    right: wp(-1),
    top: wp(-1),
    borderRadius: wp(13 / 2),
    justifyContent: "center",
    alignItems: "center",
  },
  countTextStyle: {
    ...commonFontStyle(fontFamily.regular, 8, colors.white),
  },
  secondContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default HomeHeader;
