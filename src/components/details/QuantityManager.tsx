import React, { useCallback } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { icons } from "../../theme/Icons";
import { colors } from "../../theme/Colors";
import { commonFontStyle } from "../../theme/Fonts";
import { fontFamily } from "../../helper/constants";
import { hp, wp } from "../../helper/globalFunctions";
import { CircleIconProps, QuantityManagerProps } from "../../helper/types";

const CircleIcon = ({ icon, onPress }: CircleIconProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.circleContainer}>
      <Image source={icon} style={styles.iconStyle} resizeMode="contain" />
    </TouchableOpacity>
  );
};

const QuantityManager = ({
  quantity,
  setQuantity,
  minQuantity,
}: QuantityManagerProps) => {
  const onMinusPress = useCallback(() => {
    if (quantity > (minQuantity || 0)) setQuantity(quantity - 1);
  }, [quantity]);

  const onPlusPress = useCallback(() => {
    setQuantity(quantity + 1);
  }, [quantity]);

  return (
    <View style={styles.container}>
      <CircleIcon icon={icons.minus} onPress={onMinusPress} />
      <Text style={styles.countStyle}>{quantity}</Text>
      <CircleIcon icon={icons.plus} onPress={onPlusPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: hp(12),
    marginBottom: hp(18),
    flexDirection: "row",
    alignItems: "center",
  },
  circleContainer: {
    width: hp(36),
    height: hp(36),
    borderWidth: 2,
    borderRadius: hp(36 / 2),
    borderColor: colors.grey,
    justifyContent: "center",
    alignItems: "center",
  },
  iconStyle: {
    height: hp(36),
    width: wp(10),
  },
  countStyle: {
    width: wp(50),
    textAlign: "center",
    ...commonFontStyle(fontFamily.regular, 22, colors.grey),
  },
});

export default QuantityManager;
