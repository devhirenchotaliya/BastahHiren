import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getText, hp, wp } from "../../helper/globalFunctions";
import { commonFontStyle } from "../../theme/Fonts";
import { fontFamily } from "../../helper/constants";
import { colors } from "../../theme/Colors";
import { icons } from "../../theme/Icons";
import { ViewAllHeaderProps } from "../../helper/types";
import { string } from "../../i18n/locales/en";

const ViewAllHeader = ({ headerTitle, onPressViewAll }: ViewAllHeaderProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleTextStyle}>{headerTitle}</Text>
      <TouchableOpacity onPress={onPressViewAll} style={styles.rowSpaceStyle}>
        <Text style={styles.allTextStyle}>{getText(string.home.all)}</Text>
        <Image
          source={icons.rightArrow}
          resizeMode="contain"
          style={styles.arrowStyle}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: wp(16),
    marginTop: hp(10),
    marginBottom: hp(20),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleTextStyle: {
    ...commonFontStyle(fontFamily.semiBold, 20, colors.primary),
  },
  arrowStyle: {
    height: hp(12),
    width: wp(7),
  },
  rowSpaceStyle: {
    flexDirection: "row",
    alignItems: "center",
  },
  allTextStyle: {
    marginHorizontal: wp(5),
    ...commonFontStyle(fontFamily.regular, 17, colors.grey3),
  },
});

export default ViewAllHeader;
