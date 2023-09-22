import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SizeItemProps } from "../../helper/types";
import { hp, wp } from "../../helper/globalFunctions";
import { colors } from "../../theme/Colors";
import { commonFontStyle } from "../../theme/Fonts";
import { fontFamily } from "../../helper/constants";

const SizeItem = ({
  data,
  onPressItem,
  selected,
  containerStyle,
  index,
  onlyItem,
}: SizeItemProps) => {
  return (
    <>
      {onlyItem ? (
        <TouchableOpacity
          onPress={onPressItem}
          style={{
            ...styles.container,
            backgroundColor: data === selected ? colors.grey : colors.grey4,
            ...containerStyle,
          }}
        >
          <Text
            style={{
              ...styles.sizeNameTextStyle,
              color: data === selected ? colors.white : colors.primary,
            }}
          >
            {data}
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={onPressItem}
          style={{
            ...styles.container,
            backgroundColor: selected === index ? colors.grey : colors.grey4,
            ...containerStyle,
          }}
        >
          <Text
            style={{
              ...styles.sizeNameTextStyle,
              color: selected === index ? colors.white : colors.primary,
            }}
          >
            {data?.value}
          </Text>
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp(78),
    height: hp(42),
    borderRadius: wp(5),
    alignItems: "center",
    marginVertical: hp(15),
    marginBottom: hp(20),
    justifyContent: "center",
    backgroundColor: colors.grey4,
  },
  sizeNameTextStyle: {
    ...commonFontStyle(fontFamily.medium, 17, colors.primary),
  },
});

export default SizeItem;
