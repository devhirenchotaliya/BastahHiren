//import liraries
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { fontFamily } from "../../helper/constants";
import { hp, wp } from "../../helper/globalFunctions";
import { TopTabBarItemProps } from "../../helper/types";
import { colors } from "../../theme/Colors";
import { commonFontStyle } from "../../theme/Fonts";

const TopTabBarItem = ({
  data,
  onTabItemPress,
  containerStyle,
}: TopTabBarItemProps) => {
  return (
    <View>
      <View style={{ ...styles.container, ...containerStyle }}>
        <Text
          style={
            data?.isActive ? styles.activeTextStyle : styles.inActiveTextStyle
          }
        >
          {data.name}
        </Text>
      </View>
      <View
        style={{
          marginTop: data?.isActive ? -1.5 : 0,
          borderBottomWidth: data?.isActive ? 3 : 0.5,
          borderBottomColor: data?.isActive
            ? colors.primary
            : colors.borderGrey,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: hp(18),
    paddingHorizontal: wp(16),
  },
  activeTextStyle: {
    ...commonFontStyle(fontFamily.medium, 18, colors.primary),
  },
  inActiveTextStyle: {
    ...commonFontStyle(fontFamily.extraLight, 18, colors.primary),
  },
});

export default TopTabBarItem;
