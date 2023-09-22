import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { hp, wp } from "../../helper/globalFunctions";
import { ColorsItemProps } from "../../helper/types";
import { icons } from "../../theme/Icons";
import { colors } from "../../theme/Colors";

const ColorsItem = ({
  data,
  onPress,
  selectedColor,
  index,
}: ColorsItemProps) => {
  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        onPress={onPress}
        style={{
          ...styles.container,
          backgroundColor: data?.value || "transparent",
          opacity: selectedColor === index ? 0.5 : 1,
        }}
      ></TouchableOpacity>
      {selectedColor === index ? (
        <Image
          resizeMode="contain"
          source={icons.right}
          style={styles.rightIconStyle}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginRight: wp(15),
    alignItems: "center",
    marginVertical: hp(10),
    justifyContent: "center",
  },
  container: {
    width: hp(30),
    height: hp(30),
    alignItems: "center",
    borderRadius: hp(30 / 2),
    justifyContent: "center",
  },
  rightIconStyle: {
    height: wp(15),
    width: wp(15),
    position: "absolute",
    tintColor: colors.primary,
  },
});

export default ColorsItem;
