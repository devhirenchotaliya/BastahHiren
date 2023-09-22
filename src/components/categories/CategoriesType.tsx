//import liraries
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { fontFamily } from "../../helper/constants";
import { hp, wp } from "../../helper/globalFunctions";
import { CategoriesTypeProps } from "../../helper/types";
import { colors } from "../../theme/Colors";
import { commonFontStyle } from "../../theme/Fonts";

const CategoriesType = ({
  data,
  selected,
  index,
  onPressItem,
}: CategoriesTypeProps) => {
  return (
    <TouchableOpacity
      onPress={onPressItem}
      key={index}
      style={
        selected === index ? styles.activeContainer : styles.inActiveContainer
      }
    >
      <Text
        style={
          selected === index
            ? styles.activeNameTextStyle
            : styles.inActiveNameTextStyle
        }
      >
        {data.name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  activeContainer: {
    marginVertical: hp(30),
    paddingVertical: hp(10),
    backgroundColor: colors.grey,
    justifyContent: "center",
    alignItems: "center",
  },
  activeNameTextStyle: {
    ...commonFontStyle(fontFamily.medium, 18, colors.white),
  },
  inActiveContainer: {
    marginVertical: hp(30),
    paddingVertical: hp(10),
    backgroundColor: colors.gery7,
    justifyContent: "center",
    alignItems: "center",
  },
  inActiveNameTextStyle: {
    ...commonFontStyle(fontFamily.medium, 18, colors.primary),
  },
});

export default CategoriesType;
